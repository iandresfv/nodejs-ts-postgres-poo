import * as dotenv from 'dotenv';
import { type DataSource } from 'typeorm';
import { AppDataSource } from './datasource';

export abstract class ServerConfig {
    constructor() {
        const nodeName = this.createPathEnv(this.nodeEnv);
        dotenv.config({ path: nodeName });
    }

    public getEnvironment(key: string): string | undefined {
        return process.env[key];
    }

    public getNumberEnvironment(key: string): number {
        return Number(this.getEnvironment(key));
    }

    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() ?? 'development';
    }

    public createPathEnv(path: string): string {
        const arrEnv: string[] = ['env'];
        if (path !== null) {
            arrEnv.unshift(...path.split('.'));
        }
        return '.' + arrEnv.join('.');
    }

    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    }
}
