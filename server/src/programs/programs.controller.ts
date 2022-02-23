import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { RolesProgram } from 'src/auth/roles-program.decorator';
import { RolesProgramGuard } from 'src/auth/roles-program.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/user.decorator';
import { RolesGuard } from './../auth/roles.guard';
import { UserRoleEnum } from './../users/enum/user-role.enum';
import { ProgramDto, UpdateAllDto } from './dto/program.dto';
import { ProgramEntity } from './program.entity';
import { ProgramsRO } from './program.interface';
import { ProgramsService } from './programs.service';

class UpdateProgramParams {
  @IsUUID()
  programId: string;
}

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

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update program-properties for ALL programs (overwrites)',
  })
  @Post('/update')
  public async updateAll(@Body() body: UpdateAllDto): Promise<string> {
    if (body.secret !== process.env.RESET_SECRET) {
      throw new HttpException('Not allowed.', HttpStatus.FORBIDDEN);
    }
    return await this.programService.updateAll(body);
  }

  @ApiBearerAuth()
  @UseGuards(RolesProgramGuard)
  @ApiOperation({ summary: 'Update a program-property (overwrites)' })
  @ApiParam({ name: 'programId', required: true, type: 'string' })
  @RolesProgram(UserRoleEnum.edit)
  @Post('/:programId/update')
  public async updateOne(
    @Param() params: UpdateProgramParams,
    @Body() programUpdate: ProgramDto,
  ): Promise<ProgramEntity> {
    return await this.programService.update(params.programId, programUpdate);
  }
}
