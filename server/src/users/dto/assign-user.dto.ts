import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum } from './../enum/user-role.enum';

export class AssignUserDto {
  @ApiProperty({ example: 'user@example.org' })
  @IsNotEmpty()
  @IsEmail()
  public readonly userName: string;

  @ApiProperty({
    example: Object.values(UserRoleEnum).join(' | '),
    enum: UserRoleEnum,
  })
  @IsNotEmpty()
  public readonly role: UserRoleEnum;

  @ApiProperty({ example: 'b47920c1-b24c-4021-906d-3314a5177d44' })
  @IsString()
  public readonly programId: string;
}
