import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { getRepository, Repository } from 'typeorm';
import { ProgramUserAssignmentEntity } from '../programs/program-user-assignment.entity';
import { ProgramEntity } from './../programs/program.entity';
import { AssignUserDto } from './dto/assign-user.dto';
import { UserEntity } from './user.entity';
import { UserRO } from './user.interface';
import jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @InjectRepository(ProgramEntity)
  private readonly programRepository: Repository<ProgramEntity>;

  @InjectRepository(ProgramUserAssignmentEntity)
  private readonly programAssignmetRepository: Repository<ProgramUserAssignmentEntity>;

  public async create(userName: string, password: string): Promise<UserRO> {
    // check uniqueness of email
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.userName = :userName', { userName });

    const user = await qb.getOne();

    if (user) {
      const errors = { userName: 'Username must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new UserEntity();
    newUser.userName = userName;
    newUser.password = password;
    const savedUser = await this.userRepository.save(newUser);
    return this.buildUserRO(savedUser);
  }

  private buildUserRO(user: UserEntity): UserRO {
    const userRO = {
      id: user.id,
      userName: user.userName,
      token: this.generateJWT(user),
      roles: user.programAssignments,
    };
    return { user: userRO };
  }

  private generateJWT(user: UserEntity): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    const toSign = {
      id: user.id,
      userName: user.userName,
      exp: exp.getTime() / 1000,
      role: user.programAssignments,
    };
    const result = jwt.sign(toSign, process.env.JWT_SECRET);
    return result;
  }

  public async findById(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['programAssignments', 'programAssignments.program'],
      where: { id: id },
    });
    if (!user) {
      throw new HttpException(
        'Unauthorized user not found',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  public async assign(assignUserDto: AssignUserDto) {
    const findOneOptions = {
      userName: assignUserDto.userName,
    };
    const user = await this.userRepository.findOne({
      where: findOneOptions,
      relations: ['programAssignments', 'programAssignments.program'],
    });
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const program = await this.programRepository.findOne(
      assignUserDto.programId,
    );
    if (!program) {
      throw new BadRequestException('Invalid program');
    }

    let programAssignment;
    for (const oldProgramAssignment of user.programAssignments) {
      if (oldProgramAssignment.program.id === assignUserDto.programId) {
        programAssignment = oldProgramAssignment;
      }
    }

    programAssignment = new ProgramUserAssignmentEntity();
    programAssignment.role = assignUserDto.role;
    programAssignment.program = program;
    programAssignment.user = user;
    return await this.programAssignmetRepository.save(programAssignment);
  }

  public async login(userName: string, password: string): Promise<UserRO> {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .addSelect('password')
      .leftJoinAndSelect('user.programAssignments', 'assignment')
      .where('"userName" = :userName', { userName });
    const user = await qb.getRawOne();
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const verified = bcrypt.compareSync(password, user.password);
    if (!verified) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const returnUser = await this.userRepository.findOne(user.id);
    return this.buildUserRO(returnUser);
  }
}
