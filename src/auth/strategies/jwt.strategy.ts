import { ExtractJwt, Strategy as JwtStr, type StrategyOptions } from 'passport-jwt';
import { passportUse } from '../../utils';
import { type PayloadToken } from '../model/auth.model';
import { AuthService } from '../services/auth.service';
import { type UserEntity } from '../../user/entities/user.entity';

export class JwtStrategy extends AuthService {
    async validate(payload: PayloadToken, done: any): Promise<UserEntity> {
        return done(null, payload);
    }

    get use() {
        passportUse<
            JwtStr,
            StrategyOptions,
            (payload: PayloadToken, done: any) => Promise<UserEntity>
        >(
            'jwt',
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment('JWT_SECRET'),
                ignoreExpiration: false,
            },
            this.validate,
        );
        // eslint-disable-next-line no-useless-return
        return;
    }
}
