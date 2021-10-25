import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesProgram } from '../auth/roles-program.decorator';
import { RolesProgramGuard } from '../auth/roles-program.guard';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { AnswerEntity } from './answer.entity';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';

@ApiBearerAuth()
@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  private readonly answerService: AnswersService;
  public constructor(answerService: AnswersService) {
    this.answerService = answerService;
  }

  @ApiBearerAuth()
  @UseGuards(RolesProgramGuard)
  @ApiOperation({ summary: 'Post an answer (overwrites)' })
  @RolesProgram(UserRoleEnum.edit)
  @Post()
  public async post(@Body() answerPost: AnswerDto): Promise<AnswerEntity> {
    return await this.answerService.post(answerPost);
  }
}
