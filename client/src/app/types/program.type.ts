import { QuestionSection } from './question-section.type';
import { TranslatableString } from './translatable-string.type';

export interface Program extends ProgramMetaData {
  sections: QuestionSection[];
}

export interface ProgramMetaData {
  id: string;
  label: string | TranslatableString;
  narrativeReportTemplate?: string;
}
