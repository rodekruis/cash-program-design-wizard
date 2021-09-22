import { QuestionSection } from './question-section.type';
import { TranslatableString } from './translatable-string.type';

export interface Program {
  id: number;
  label: string | TranslatableString;
  sections: QuestionSection[];
}
