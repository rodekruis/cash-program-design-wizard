module.exports = {
  type: 'postgres',
  host: process.env.POSGRES_HOST,
  port: parseInt(process.env.POSGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/**.entity{.ts,.js}'],
  subscribers: ['src/**/**.subscriber{.ts,.js}'],
  migrationsTableName: 'custom_migration_table',
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
  dropSchema: false,
  synchronize: true,
};
