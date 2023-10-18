import { type ObjectLiteral, type EntityTarget, type Repository } from 'typeorm';
import { type BaseEntity } from './base.entity';
import { ServerConfig } from './config';

export class BaseService<T extends BaseEntity> extends ServerConfig {
    public execRepository: Promise<Repository<T>>;

    constructor(private readonly getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
        const dbConnection = await this.initConnect;
        return dbConnection.getRepository(entity);
    }
}
