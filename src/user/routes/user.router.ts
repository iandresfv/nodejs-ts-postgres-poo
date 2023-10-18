import { BaseRouter } from '../../shared/router/router';
import { UserController } from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.get('/users', async (req, res) => this.controller.getUsers(req, res));
        this.router.post(
            '/users',
            (req, res, next) => this.middleware.userValidator(req, res, next),
            async (req, res) => this.controller.createUser(req, res),
        );
        this.router.get('/users/:id', this.middleware.authenticate('jwt'), async (req, res) =>
            this.controller.getUserById(req, res),
        );
        this.router.put('/users/:id', async (req, res) => this.controller.updateUser(req, res));
        this.router.delete(
            '/users/:id',
            this.middleware.authenticate('jwt'),
            (req, res, next) => this.middleware.checkAdminRole(req, res, next),
            async (req, res) => this.controller.deleteUser(req, res),
        );
    }
}
