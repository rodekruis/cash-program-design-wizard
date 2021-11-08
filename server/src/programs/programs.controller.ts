import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/user.decorator';
import { RolesGuard } from './../auth/roles.guard';
import { UserRoleEnum } from './../users/enum/user-role.enum';
import { ProgramsRO } from './program.interface';
import { ProgramsService } from './programs.service';

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
  public async findAll(@User('id') userId: string): Promise<ProgramsRO> {
    return await this.programService.findAll(userId);
  }
}
