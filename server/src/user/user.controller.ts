import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  private readonly userService: UserService;
  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign-up new user' })
  @Post('user')
  public async createAw(@Body() userData: CreateUserDto): Promise<any> {
    return this.userService.create(userData.userName, userData.password);
  }
}
