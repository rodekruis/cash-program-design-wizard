import { UserRoleEnum } from './../enum/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class AssignUserDto {
  @ApiProperty({ example: 'user@example.org' })
  @IsNotEmpty()
  @IsEmail()
  public readonly userName: string;

  @ApiProperty({
    example: Object.values(UserRoleEnum),
    enum: UserRoleEnum,
  })
  @IsNotEmpty()
  @MinLength(8)
  public readonly role: UserRoleEnum;

  @ApiProperty({ example: 1 })
  @IsString()
  public readonly programId: string;
}
