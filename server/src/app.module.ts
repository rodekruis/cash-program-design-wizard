import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { ProgramsModule } from './programs/programs.module';
import { QuestionsModule } from './questions/questions.module';
import { ScriptsModule } from './scripts/scripts.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSGRES_HOST,
      port: parseInt(process.env.POSGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      subscribers: ['src/**/**.subscriber{.ts,.js}'],
      migrationsTableName: 'custom_migration_table',
      migrations: [join(__dirname, '../migration/*{.ts,.js}')],
      cli: {
        migrationsDir: 'src/migration',
      },
      dropSchema: false,
      synchronize: true,
      migrationsRun: true,
      // logging: true,
    }),
    UserModule,
    AnswersModule,
    ScriptsModule,
    ProgramsModule,
    QuestionsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly connection: Connection;
}
