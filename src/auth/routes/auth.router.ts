import { SharedMiddleware } from '../../shared/middlerares/shared.middleware';
import { BaseRouter } from '../../shared/router/router';
import { AuthController } from '../controllers/auth.controllet';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
    constructor() {
        super(AuthController, SharedMiddleware);
    }

    routes(): void {
        this.router.post('/login', this.middleware.authenticate('login'), async (req, res) =>
            this.controller.login(req, res),
        );
    }
}
