import { QuestionType } from '../types/question-input.type';
import { TranslatableString } from '../types/translatable-string.type';
import { Tag } from './tag.enum';

export interface QuestionData {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  sectionId: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  sectionName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  sectionLabel: string | TranslatableString;

  id: number;
  type: QuestionType;
  label: string | TranslatableString;
  tags: string | string[] | Tag[];
}
