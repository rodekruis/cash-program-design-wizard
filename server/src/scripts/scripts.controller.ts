import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuestionTransferDto } from './dto/question-tranfer.dto';
import SeedDemoProgram from './seed-program';
import { TransferQuestionsService } from './transfer-questions';

export enum SeedScript {
  dev = 'dev',
  staging = 'staging',
}

class ResetDto {
  @ApiProperty({ example: 'fill_in_secret' })
  @IsNotEmpty()
  @IsString()
  public readonly secret: string;
  @ApiProperty({
    enum: SeedScript,
    example: Object.values(SeedScript).join(' | '),
  })
  @IsEnum(SeedScript)
  public readonly script: string;
}

@Controller('scripts')
export class ScriptsController {
  public constructor(
    private seedDemoProgram: SeedDemoProgram,
    private transferQuestionsService: TransferQuestionsService,
  ) {}

  @ApiOperation({ summary: 'Reset database' })
  @Post('/reset')
  public async resetDb(@Body() body: ResetDto, @Res() res): Promise<string> {
    if (body.secret !== process.env.RESET_SECRET) {
      return res.status(HttpStatus.FORBIDDEN).send('Not allowed');
    }
    await this.seedDemoProgram.run(body.script as SeedScript);
    return res.status(HttpStatus.ACCEPTED).send('Reset done.');
  }

  @ApiOperation({ summary: 'Exports questions as csv' })
  @Get('/export')
  public async export(
    @Query('secret') secret: string,
  ): Promise<QuestionTransferDto[]> {
    if (secret !== process.env.RESET_SECRET) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    return await this.transferQuestionsService.export();
  }
}
