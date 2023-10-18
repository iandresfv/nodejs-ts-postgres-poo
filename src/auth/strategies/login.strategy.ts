import { Strategy as LocalStrategy, type VerifyFunction } from 'passport-local';
import { passportUse } from '../../utils/passport.use';
import { AuthService } from '../services/auth.service';
import { type UserEntity } from '../../user/entities/user.entity';

const authService: AuthService = new AuthService();

export class LoginStrategy {
    async validate(username: string, password: string, done: any): Promise<UserEntity> {
        const user = await authService.validateUser(username, password);
        if (user === null) {
            return done(null, false, { message: 'Invalid credentials.' });
        }
        return done(null, user, { message: 'Logged in successfully.' });
    }

    get use(): void {
        passportUse<LocalStrategy, Record<string, unknown>, VerifyFunction>(
            'login',
            LocalStrategy,
            {
                usernameField: 'username',
                passwordField: 'password',
            },
            this.validate,
        );
        // eslint-disable-next-line no-useless-return
        return;
    }
}
