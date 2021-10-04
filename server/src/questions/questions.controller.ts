import { RolesProgram } from './../auth/roles-program.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsRO } from './question.interfaces';
import { Roles } from '../auth/roles.decorator';

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
  @ApiOperation({ summary: 'Get all questions and answers for program' })
  @RolesProgram(UserRoleEnum.edit, UserRoleEnum.view)
  @Get('programs/:programId/questions')
  public async findAll(@Param() params): Promise<QuestionsRO> {
    return await this.questionService.findAll(params.programId);
  }
}
