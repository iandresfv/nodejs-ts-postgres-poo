import { type Request, type Response } from 'express';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { UserService } from '../services/user.service';

export class UserController {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async getUsers(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const users = await this.userService.findAll();
            if (users.length === 0) {
                return this.httpResponse.NotFound(res, 'Users not found');
            }
            return this.httpResponse.Ok(res, users);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const user = await this.userService.findById(id);
            if (user === null) {
                return this.httpResponse.NotFound(res, `User with id ${id} not found`);
            }
            return this.httpResponse.Ok(res, user);
        } catch (error) {
            // return this.httpResponse.Ok(res, { message: error });
            return this.httpResponse.Error(res, error);
        }
    }

    async createUser(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { body } = req;
            const data = await this.userService.createUser(body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const {
                body,
                params: { id },
            } = req;
            const data: UpdateResult = await this.userService.updateUser(id, body);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update user. User with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.userService.deleteUser(id);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to delete user. User with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
