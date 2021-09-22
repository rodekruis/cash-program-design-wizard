import { Tag } from '../models/tag.enum';
import { TranslatableString } from './translatable-string.type';

export enum QuestionType {
  text = 'text',
  numeric = 'numeric',
  select1 = 'select1',
  selectN = 'selectN',
}
export interface QuestionInput {
  id: number;
  type: QuestionType;
  label: string | TranslatableString;
  tags: Tag[];
  options?: OptionChoice[];
}

export interface OptionChoice {
  id: number;
  label: string | TranslatableString;
}
