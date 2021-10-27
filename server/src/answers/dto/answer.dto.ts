import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AnswerDto {
  @ApiProperty({ example: '150778b8-20b8-41e7-92b4-58501e8d1043' })
  @IsUUID()
  @IsNotEmpty()
  public readonly programId: string;

  @ApiProperty({ example: '2caf08e3-b842-4120-b23c-a73c1b3b2618' })
  @IsUUID()
  @IsNotEmpty()
  public readonly questionId: string;

  @ApiProperty({ example: 'Super good answer' })
  @IsString()
  public readonly text: string;
}
