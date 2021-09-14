'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require('@nestjs/common');
var config_1 = require('@nestjs/config');
var typeorm_1 = require('@nestjs/typeorm');
var path_1 = require('path');
var app_controller_1 = require('./app.controller');
var app_service_1 = require('./app.service');
var user_module_1 = require('./user/user.module');
var AppModule = /** @class */ (function () {
  function AppModule() {}
  AppModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [
          config_1.ConfigModule.forRoot({
            envFilePath: '../.env',
          }),
          typeorm_1.TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSGRES_HOST,
            port: parseInt(process.env.POSGRES_PORT),
            username: 'cpdw',
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            schema: 'cpdw',
            entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
            subscribers: ['src/**/**.subscriber{.ts,.js}'],
            migrationsTableName: 'custom_migration_table',
            migrations: ['migration/*.ts'],
            cli: {
              migrationsDir: 'migration',
            },
            dropSchema: false,
            synchronize: true,
          }),
          user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
      }),
    ],
    AppModule,
  );
  return AppModule;
})();
exports.AppModule = AppModule;
