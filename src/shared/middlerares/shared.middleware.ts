import { type NextFunction, type Request, type Response } from 'express';
import passport from 'passport';
import { UserRole } from '../../user/dto/user.dto';
import { type UserEntity } from '../../user/entities/user.entity';
import { HttpResponse } from '../response/http.response';

export class SharedMiddleware {
    constructor(public readonly httpResponse: HttpResponse = new HttpResponse()) {}

    authenticate(type: string) {
        return passport.authenticate(type, { session: false });
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user as UserEntity;
        if (user.role !== UserRole.ADMIN) {
            return this.httpResponse.Unauthorized(res, 'Unauthorized');
        } else {
            next();
        }
    }
}
