import { RolesGuard } from './../auth/roles.guard';
import { UserRoleEnum } from './../users/enum/user-role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsRO } from './program.interface';
import { User } from '../users/user.decorator';
import { Roles } from '../auth/roles.decorator';

@ApiBearerAuth()
@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
  private readonly programService: ProgramsService;
  public constructor(programService: ProgramsService) {
    this.programService = programService;
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all assigned programs' })
  @Roles(UserRoleEnum.edit, UserRoleEnum.view)
  @Get()
  public async findAll(@User('id') userId: number): Promise<ProgramsRO> {
    return await this.programService.findAll(userId);
  }
}
