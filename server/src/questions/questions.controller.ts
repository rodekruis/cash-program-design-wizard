import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { RolesProgram } from './../auth/roles-program.decorator';
import {
  FindManyQuestionParams,
  FindOneQuestionParams,
} from './dto/find-one-question.dto';
import { QuestionEntity } from './question.entity';
import { QuestionsRO } from './question.interfaces';
import { QuestionsService } from './questions.service';

@ApiBearerAuth()
@ApiTags('questions')
@Controller()
export class QuestionsController {
  private readonly questionService: QuestionsService;
  public constructor(questionService: QuestionsService) {
    this.questionService = questionService;
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'programId', required: true, type: 'string' })
  @ApiQuery({
    name: 'section',
    required: false,
  })
  @ApiQuery({
    type: [String],
    name: 'tags',
    required: false,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all questions and answers for program' })
  @RolesProgram(UserRoleEnum.edit, UserRoleEnum.view)
  @Get('programs/:programId/questions')
  public async findAll(
    @Param() params: FindManyQuestionParams,
    @Query('section') section: string,
    @Query('tags') tags: string[],
  ): Promise<QuestionsRO> {
    return await this.questionService.find(params.programId, {
      section: section,
      tags: tags,
    });
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'programId', required: true, type: 'string' })
  @ApiParam({ name: 'questionId', required: true, type: 'string' })
  @ApiOperation({ summary: 'Get all questions and answers for program' })
  @RolesProgram(UserRoleEnum.edit, UserRoleEnum.view)
  @Get('programs/:programId/questions/:questionId')
  public async findOne(
    @Param() params: FindOneQuestionParams,
  ): Promise<QuestionEntity> {
    return await this.questionService.findOne(
      params.programId,
      params.questionId,
    );
  }
}
