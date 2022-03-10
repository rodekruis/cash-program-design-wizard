import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'edit@example.org' })
  @IsNotEmpty()
  @IsEmail()
  public readonly userName: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @MinLength(5)
  public readonly password: string;
}
