import { QuestionEntity } from './question.entity';

export interface QuestionsRO {
  questions: QuestionEntity[];
  count: number;
}

export interface QuestionSearchOption {
  section?: string;
  tags?: string[] | string;
  questionId?: string;
}
