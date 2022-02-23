import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QuestionNameDto {
  @ApiProperty()
  @IsString()
  public name: string;
  @ApiProperty()
  @IsString()
  public secret: string;
}
