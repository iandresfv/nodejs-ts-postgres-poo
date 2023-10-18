import { type Request, type Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { type UserEntity } from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(
        private readonly authService: AuthService = new AuthService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async login(req: Request, res: Response) {
        try {
            const encodedUser = req.user as UserEntity;
            const encode = await this.authService.generateToken(encodedUser);
            if (encode === null) {
                return this.httpResponse.Unauthorized(res, 'Unauthorized');
            }
            res.header('Authorization', `Bearer ${encode.accessToken}`);
            res.header('Content-Type', 'application/json');
            res.cookie('accessToken', encode.accessToken, {
                maxAge: 60000 * 60,
                httpOnly: true,
            });
            res.write(JSON.stringify(encode));
            res.end();
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
