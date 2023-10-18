import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

import { CustomerEntity } from '../../customer/entities/customer.entity';
import { UserRole } from '../dto/user.dto';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    city!: string;

    @Column()
    province!: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER, nullable: false })
    role!: UserRole;

    @OneToOne(() => CustomerEntity, customer => customer.user)
    customer!: CustomerEntity;
}
