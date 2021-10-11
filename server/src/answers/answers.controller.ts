import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnum } from '../users/enum/user-role.enum';
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
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Post an answer (overwrites)' })
  @Roles(UserRoleEnum.edit)
  @Post()
  public async post(@Body() answerPost: AnswerDto): Promise<void> {
    return await this.answerService.post(answerPost);
  }
}
