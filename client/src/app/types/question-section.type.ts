import { QuestionInput } from './question-input.type';
import { TranslatableString } from './translatable-string.type';

export interface QuestionSection {
  id: number;
  slug: string;
  order: number;
  label: string | TranslatableString;
  state: 'pending' | 'complete';
  questions: QuestionInput[];
}
