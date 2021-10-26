import { Injectable } from '@angular/core';
import { QuestionData } from '../models/question-data.model';
import { Program } from '../types/program.type';
import { QuestionInput, QuestionType } from '../types/question-input.type';
import { QuestionSection } from '../types/question-section.type';
import { ApiPath, ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramDataService {
  constructor(private apiService: ApiService) {}

  public async getProgram(programId: string): Promise<Program> {
    return new Promise(async (resolve, reject) => {
      if (!programId) {
        return reject('No Program ID provided');
      }

      const allQuestions = await this.getQuestions(programId);
      const allSections = this.extractSections(allQuestions);
      const fullSections = this.fillSectionsWithQuestions(
        allSections,
        allQuestions,
      );

      return resolve({
        id: programId,
        label: '',
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

    return this.apiService
      .post(ApiPath.answers, {
        programId,
        questionId: question.id,
        text: plainAnswer,
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

  private async getQuestions(
    programId: string,
    sectionId?: string,
  ): Promise<QuestionData[]> {
    const optionalParams: { [param: string]: string | number } = {};
    if (sectionId) {
      optionalParams.section = sectionId;
    }
    const data = await this.apiService
      .get(`programs/${programId}/questions`, optionalParams)
      .toPromise();

    return data.questions ? data.questions : [];
  }

  private extractSections(questions: QuestionData[]): QuestionSection[] {
    const sections = [];

    questions.forEach((question) => {
      const section = {
        id: question.sectionId,
        name: question.sectionName,
        label: question.sectionLabel,
      };

      if (
        !sections.some(
          (existingSection) => existingSection.id === question.sectionId,
        )
      ) {
        sections.push(section);
      }
    });

    return sections;
  }

  private fillSectionsWithQuestions(
    sections: QuestionSection[],
    allQuestions: QuestionData[],
  ): QuestionSection[] {
    return sections.map((section) => {
      section.questions = allQuestions
        .filter((question) => question.sectionId === section.id)
        .map((question) => {
          // Remove unused properties
          delete question.sectionId;
          delete question.sectionName;
          delete question.sectionLabel;

          if (this.isMultipleChoice(question)) {
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

          return {
            ...question,
            storedAnswer: question.answer,
          } as QuestionInput;
        });
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
