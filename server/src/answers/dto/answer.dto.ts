import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class AnswerDto {
  @ApiProperty({ example: '150778b8-20b8-41e7-92b4-58501e8d1043' })
  @IsNotEmpty()
  @IsEmail()
  public readonly programId: string;

  @ApiProperty({ example: '2caf08e3-b842-4120-b23c-a73c1b3b2618' })
  @IsNotEmpty()
  public readonly questionId: string;

  @ApiProperty({ example: 'Super good answer' })
  @IsNotEmpty()
  public readonly text: string;
}
