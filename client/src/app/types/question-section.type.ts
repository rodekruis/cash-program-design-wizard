import { QuestionInput } from './question-input.type';
import { TranslatableString } from './translatable-string.type';

export interface QuestionSection {
  id: string;
  sectionNr?: number;
  name: string;
  order: number;
  label: string | TranslatableString;
  state: 'pending' | 'complete';
  subsections: QuestionSubsection[];
}
export interface QuestionSubsection {
  id: string;
  name: string;
  order: number;
  sectionId?: string;
  questions: QuestionInput[];
}
