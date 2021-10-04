import { QuestionEntity } from './question.entity';

export interface QuestionsRO {
  questions: QuestionEntity[];
  count: number;
}
