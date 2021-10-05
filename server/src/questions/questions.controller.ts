import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { RolesProgram } from './../auth/roles-program.decorator';
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
  @ApiOperation({ summary: 'Get all questions and answers for program' })
  @RolesProgram(UserRoleEnum.edit, UserRoleEnum.view)
  @Get('programs/:programId/questions')
  public async findAll(@Param() params): Promise<QuestionsRO> {
    return await this.questionService.findAll(params.programId);
  }
}
