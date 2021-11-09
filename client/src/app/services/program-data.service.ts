import { Injectable } from '@angular/core';
import { QuestionData } from '../models/question-data.model';
import { Program, ProgramMetaData } from '../types/program.type';
import { QuestionInput, QuestionType } from '../types/question-input.type';
import {
  QuestionSection,
  QuestionSubsection,
} from '../types/question-section.type';
import { ApiPath, ApiService } from './api.service';
import { AuthService } from './auth.service';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramDataService {
  private userName = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private syncService: SyncService,
  ) {
    this.authService.authenticationState$.subscribe((user) => {
      if (!user || !user.userName) {
        return;
      }
      this.userName = user.userName;
    });
  }

  public async getProgram(programId: string): Promise<Program> {
    return new Promise(async (resolve, reject) => {
      if (!programId) {
        return reject('No Program ID provided');
      }

      const programMetaData = await this.getProgramMetaData(programId);
      const allQuestions = await this.getQuestions(programId);
      const allSections = this.extractSections(allQuestions);
      const allSubsections = this.extractSubsections(allQuestions);
      const fullSections = this.fillSectionsWithQuestions(
        allSections,
        allSubsections,
        allQuestions,
      );

      return resolve({
        id: programId,
        name: programMetaData.name,
        narrativeReportTemplate: programMetaData.narrativeReportTemplate,
        sections: fullSections,
      });
    });
  }

  public saveAnswer(programId: string, question: QuestionInput) {
    // If nothing changed, nothing needs to be stored
    if (
      question.answer === question.storedAnswer ||
      (this.isMultipleChoice(question) &&
        this.isEqualJson(question.answer, question.storedAnswer))
    ) {
      return;
    }
    // Make sure to always store String-values, even for empty answers
    if (question.answer === null || question.answer === undefined) {
      question.answer = '';
    }

    let plainAnswer = question.answer;

    if (this.isMultipleChoice(question)) {
      plainAnswer = JSON.stringify(question.answer);
    }

    return this.syncService
      .tryPost(ApiPath.answers, {
        programId,
        questionId: question.id,
        text: plainAnswer.toString(), // Prevent storing numeric-input as a number
      })
      .subscribe(
        () => {
          // Store the stored (backend)state in the local state
          question.storedAnswer = question.answer;
        },
        (error) => {
          console.log('Answer save failed.', error);
        },
      );
  }

  public saveComment(
    programId: string,
    question: QuestionInput,
    commentText: string,
  ) {
    if (!programId || !question || !commentText) {
      return;
    }

    return (
      this.syncService
        .tryPost(ApiPath.comments, {
          programId,
          questionId: question.id,
          text: commentText,
        })
        .subscribe((res) => {
          question.comments.push({
            id: res.id,
            userName: this.userName,
            created: new Date().toISOString(),
            text: commentText,
          });
        }),
      (error) => console.warn('Comment save failed.', error)
    );
  }

  private async getProgramMetaData(
    programId: string,
  ): Promise<ProgramMetaData> {
    // Work-around for lack of a GetProgramById-endpoint:
    const data = await this.apiService.get(ApiPath.userPrograms).toPromise();
    const thisProgram = data.programs.find(
      (program) => program.id === programId,
    );
    return thisProgram;
  }

  private async getQuestions(
    programId: string,
    sectionId?: string,
  ): Promise<QuestionData[]> {
    const optionalParams: { [param: string]: string | number } = {};
    if (sectionId) {
      optionalParams.section = sectionId;
    }
    const data = await this.apiService
      .get(`${ApiPath.programs}/${programId}/questions`, optionalParams)
      .toPromise();

    return data.questions ? data.questions : [];
  }

  private extractSections(questions: QuestionData[]): QuestionSection[] {
    const sections = [];

    questions.forEach((question) => {
      if (
        !sections.some(
          (existingSection) => existingSection.id === question.sectionId,
        )
      ) {
        sections.push({
          id: question.sectionId,
          name: question.sectionName,
          label: question.sectionLabel,
        });
      }
    });

    return sections;
  }

  private extractSubsections(questions: QuestionData[]): QuestionSubsection[] {
    const subsections = [];

    questions.forEach((question) => {
      if (
        !subsections.some(
          (existingSubsections) =>
            existingSubsections.id === question.subsectionId,
        )
      ) {
        subsections.push({
          id: question.subsectionId,
          name: question.subsectionName,
          label: question.subsectionLabel,
          sectionId: question.sectionId,
        });
      }
    });

    return subsections;
  }

  private fillSectionsWithQuestions(
    sections: QuestionSection[],
    subsections: QuestionSubsection[],
    allQuestions: QuestionData[],
  ): QuestionSection[] {
    const filledSubsections = subsections.map((subsection) => {
      subsection.questions = allQuestions
        .filter((question) => question.subsectionId === subsection.id)
        .map((question) => {
          // Remove unused properties
          delete question.subsectionId;
          delete question.subsectionName;
          delete question.subsectionLabel;
          delete question.sectionId;
          delete question.sectionName;
          delete question.sectionLabel;

          if (this.isMultipleChoice(question) && question.answer) {
            try {
              question.answer = JSON.parse(question.answer);
            } catch (error) {
              console.warn(
                'Error parsing JSON-value in answer',
                question.id,
                question.name,
                question.answer,
              );
            }
          }

          if (question.tags) {
            // Only use unique tag-values:
            question.tags = question.tags.filter(
              (el, i, array) => array.indexOf(el) === i,
            );
          }

          if (question.comments.length > 0) {
            question.comments.sort((a, b) => (a.created < b.created ? -1 : 1));
          }

          return {
            ...question,
            storedAnswer: question.answer,
          } as QuestionInput;
        });
      return subsection;
    });

    return sections.map((section) => {
      section.subsections = filledSubsections.filter(
        (subsection) => subsection.sectionId === section.id,
      );
      return section;
    });
  }

  private isMultipleChoice(question: QuestionData | QuestionInput): boolean {
    return QuestionType.selectN === question.type;
  }

  private isEqualJson(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}
