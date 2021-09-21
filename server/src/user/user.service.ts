import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  public async create(username: string, password: string): Promise<any> {
    // check uniqueness of email
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;
    const savedUser = await this.userRepository.save(newUser);
    return this.buildUserRO(savedUser);
  }

  private buildUserRO(user: UserEntity): any {
    const userRO = {
      id: user.id,
      username: user.username,
      token: this.generateJWT(user),
    };
    return { user: userRO };
  }

  public generateJWT(user: UserEntity): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const result = jwt.sign(
      {
        id: user.id,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET,
    );
    return result;
  }
}
