import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ServerConfig } from '../../config/config';
import { type UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { type PayloadToken } from '../model/auth.model';

export class AuthService extends ServerConfig {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt,
    ) {
        super();
    }

    public async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this.userService.findUserByEmail(username);
        const userByUsername = await this.userService.findUserByUsername(username);

        if (userByUsername !== null) {
            const isMatch = await bcrypt.compare(password, userByUsername.password);
            if (isMatch) {
                return userByUsername;
            }
        }

        if (userByEmail !== null) {
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            if (isMatch) {
                return userByEmail;
            }
        }

        return null;
    }

    signToken(payload: jwt.JwtPayload, secret: string): string {
        return this.jwtInstance.sign(payload, secret, { expiresIn: '1d' });
    }

    public async generateToken(
        user: UserEntity,
    ): Promise<{ accessToken: string | null; user: UserEntity }> {
        const userQuery = (await this.userService.findUserWithRol(
            user.id,
            user.role,
        )) as UserEntity;
        const payload: PayloadToken = { role: userQuery.role, sub: userQuery.id };
        if (userQuery !== null) {
            user.password = 'hidden';
        }
        return {
            accessToken: this.signToken(payload, this.getEnvironment('JWT_SECRET') as string),
            user,
        };
    }
}
