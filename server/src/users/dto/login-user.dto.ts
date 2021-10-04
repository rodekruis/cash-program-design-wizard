import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'edit@example.org' })
  @IsNotEmpty()
  @IsEmail()
  public readonly userName: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;
}
