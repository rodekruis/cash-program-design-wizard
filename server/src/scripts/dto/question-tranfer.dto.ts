import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum QuestionType {
  text = 'text',
  textLong = 'text-long',
  numeric = 'numeric',
  select1 = 'select-1',
  selectN = 'select-n',
}

export class QuestionTransferDto {
  @ApiProperty({ example: 'pa-info' })
  @IsString()
  public section: string;

  @ApiProperty({ example: 'pa-gender' })
  @IsString()
  public subsection: string;

  @ApiProperty({ example: 'pa-gender-01' })
  @IsString()
  public questionName: string;

  @ApiProperty({ example: 'text' })
  @IsString()
  public questionType: QuestionType;

  @ApiProperty({ example: 'GENDER: ' })
  @IsString()
  public questionLabelEn: string;

  @ApiProperty({ example: 1 })
  @IsString()
  public orderPriority: number;

  @ApiProperty({ example: 'people' })
  @IsString()
  public tags: string;

  @ApiProperty({ example: 'man' })
  @IsString()
  public optionChoice1: string;

  @ApiProperty({ example: 'Man' })
  @IsString()
  public optionChoiceLabelEn1: string;

  @ApiProperty({ example: 'woman' })
  @IsString()
  public optionChoice2: string;

  @ApiProperty({ example: 'Woman' })
  @IsString()
  public optionChoice1LabelEn2: string;
}
