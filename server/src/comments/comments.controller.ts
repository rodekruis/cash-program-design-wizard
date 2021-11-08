import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesProgram } from '../auth/roles-program.decorator';
import { RolesProgramGuard } from '../auth/roles-program.guard';
import { UserRoleEnum } from '../users/enum/user-role.enum';
import { User } from '../users/user.decorator';
import { CommentEntity } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  private readonly commentService: CommentsService;
  public constructor(commentService: CommentsService) {
    this.commentService = commentService;
  }

  @ApiBearerAuth()
  @UseGuards(RolesProgramGuard)
  @ApiOperation({ summary: 'Post a comment (appends)' })
  @RolesProgram(UserRoleEnum.edit, UserRoleEnum.view)
  @Post()
  public async post(
    @User('id') userId: string,
    @Body() commentPost: CommentDto,
  ): Promise<CommentEntity> {
    return await this.commentService.post(userId, commentPost);
  }
}
