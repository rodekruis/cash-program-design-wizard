import { Tag } from '../models/tag.enum';
import { TranslatableString } from './translatable-string.type';

export enum QuestionType {
  text = 'text',
  textLong = 'text-long',
  numeric = 'numeric',
  select1 = 'select-1',
  selectN = 'select-n',
}
export interface QuestionInput {
  id: number;
  type: QuestionType;
  label: string | TranslatableString;
  tags: Tag[];
  options?: OptionChoice[];
  comment?: string;
}

export interface OptionChoice {
  id: number;
  label: string | TranslatableString;
  value: string;
}