import { IsUUID } from 'class-validator';
export class FindOneQuestionParams {
  @IsUUID()
  programId: string;
  @IsUUID()
  questionId: string;
}

export class FindManyQuestionParams {
  @IsUUID()
  programId: string;
}
