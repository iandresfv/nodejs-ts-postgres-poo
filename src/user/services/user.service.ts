import * as bcrypt from 'bcrypt';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { type UserDTO, type UserRole } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findAll(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }

    async findById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }

    async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.username = :username', { username })
            .getOne();
    }

    async findUserWithRol(id: string, role: UserRole): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.role = :role', { role })
            .getOne();
    }

    async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body);
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
        return (await this.execRepository).save(newUser);
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updateUser(id: string, body: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update({ id }, body);
    }
}
