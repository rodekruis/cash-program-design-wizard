import { Injectable } from '@angular/core';
import { QuestionData } from '../models/question-data.model';
import { Program } from '../types/program.type';
import { QuestionInput } from '../types/question-input.type';
import { QuestionSection } from '../types/question-section.type';
import { ApiService } from './api.service';

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
        id: question.section_id,
        name: question.section_name,
        label: question.section_label,
      };

      if (
        !sections.some(
          (existingSection) => existingSection.id === question.section_id,
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
        .filter((question) => question.section_id === section.id)
        .map((question) => {
          // Remove unused properties
          delete question.section_id;
          delete question.section_name;
          delete question.section_label;

          return question as QuestionInput;
        });
      return section;
    });
  }
}
