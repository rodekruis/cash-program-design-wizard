import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuestionNameDto } from './dto/question-name.dto';
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
  public readonly stagingAmount: number;
}

class ExportDto {
  @ApiProperty({ example: 'fill_in_secret' })
  @IsNotEmpty()
  @IsString()
  public readonly secret: string;
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
    const seedResult = await this.seedDemoProgram.run(
      body.script as SeedScript,
      body.stagingAmount,
    );
    return res.status(HttpStatus.ACCEPTED).send(seedResult);
  }

  @ApiOperation({ summary: 'Exports questions as CSV' })
  @Post('/export')
  public async export(@Body() body: ExportDto): Promise<QuestionTransferDto[]> {
    if (body.secret !== process.env.RESET_SECRET) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    return await this.transferQuestionsService.export();
  }

  @ApiOperation({ summary: 'Import/update questions via CSV' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    // See: https://github.com/nestjs/swagger/issues/417#issuecomment-562869578
    schema: {
      type: 'object',
      properties: {
        secret: {
          type: 'string',
          minLength: 1,
        },
        file: {
          type: 'string',
          format: 'binary',
          minLength: 1,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
    }),
  )
  @Post('/import')
  public async import(
    @Body() body: ExportDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (body.secret !== process.env.RESET_SECRET) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }

    if (!file || !file.buffer) {
      throw new HttpException('Missing file', HttpStatus.BAD_REQUEST);
    }

    return await this.transferQuestionsService.import(file.buffer);
  }

  @Post('questions/delete')
  public async deleteQuestion(@Body() body: QuestionNameDto): Promise<any> {
    console.log('deleteQuestion: ', body);
    if (body.secret !== process.env.RESET_SECRET) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    return await this.transferQuestionsService.deleteQuestion(body.name);
  }
}
