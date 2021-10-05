import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssignUserDto } from './dto/assign-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly userService: UserService;
  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign-up new user' })
  @Post()
  public async create(@Body() userData: CreateUserDto): Promise<any> {
    return this.userService.create(userData.userName, userData.password);
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('/login')
  public async login(@Body() userData: LoginUserDto): Promise<any> {
    return this.userService.login(userData.userName, userData.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign user to program with a role' })
  @Post('/assign')
  public async assign(@Body() userData: AssignUserDto): Promise<any> {
    return this.userService.assign(userData);
  }
}
