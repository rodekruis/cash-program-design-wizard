import {
  OptionChoice,
  QuestionComment,
  QuestionType,
} from '../types/question-input.type';
import { TranslatableString } from '../types/translatable-string.type';
import { Tag } from './tag.enum';

export interface QuestionData {
  sectionId: string;
  sectionName: string;
  sectionLabel: string | TranslatableString;

  subsectionId: string;
  subsectionName: string;
  subsectionLabel: string | TranslatableString;

  id: string;
  name: string;
  type: QuestionType;
  label: string | TranslatableString;
  tags?: string[] | Tag[];
  answer?: string;
  optionChoices?: OptionChoice[];
  comments?: QuestionComment[];
}
