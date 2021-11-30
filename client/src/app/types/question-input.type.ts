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
  id: string;
  name: string;
  type: QuestionType;
  label: string | TranslatableString;
  tags: Tag[];
  optionChoices?: OptionChoice[];
  answer?: string | string[];
  answerUpdated?: string | Date;
  storedAnswer?: string | string[];
  comments?: QuestionComment[];
  isInProgress?: boolean;
  hasError?: boolean;
}

export interface OptionChoice {
  id: string;
  label: string | TranslatableString;
  name: string;
}

export interface QuestionComment {
  id: string;
  text: string;
  userName: string;
  created: string | Date;
}
