import { type UserRole } from '../../user/dto/user.dto';

export interface PayloadToken {
    role: UserRole;
    sub: string;
}
