import { QuestionSection } from './question-section.type';
import { TranslatableString } from './translatable-string.type';

export interface Program {
  id: string;
  label: string | TranslatableString;
  sections: QuestionSection[];
  narrativeReportTemplate?: string;
}
