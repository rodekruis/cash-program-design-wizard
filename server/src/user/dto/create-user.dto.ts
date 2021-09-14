import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.org' })
  @IsNotEmpty()
  @IsEmail()
  public readonly userName: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;
}
