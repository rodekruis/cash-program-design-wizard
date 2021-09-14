import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSGRES_HOST,
      port: parseInt(process.env.POSGRES_PORT),
      username: 'cpdw',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      schema: 'cpdw',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      subscribers: ['src/**/**.subscriber{.ts,.js}'],
      migrationsTableName: 'custom_migration_table',
      migrations: ['migration/*.ts'],
      cli: {
        migrationsDir: 'migration',
      },
      dropSchema: false,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly connection: Connection;
}
