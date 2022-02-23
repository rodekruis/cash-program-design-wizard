import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProgramDto {
  @ApiProperty({ example: 'program name' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly name: string;

  @ApiProperty({ example: `## Report\n\n - example: {{variable-1}}` })
  @IsString()
  @IsOptional()
  public readonly narrativeReportTemplate: string;
}
