import * as dotenv from 'dotenv';
import path from 'path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
    path:
        process.env.NODE_ENV !== undefined
            ? `.${process.env.NODE_ENV.trim()}.env`
            : '.development.env',
});

const Config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource: DataSource = new DataSource(Config);
