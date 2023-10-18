import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';
import { SharedMiddleware } from '../../shared/middlerares/shared.middleware';
import { UserDTO } from '../dto/user.dto';

export class UserMiddleware extends SharedMiddleware {
    userValidator(req: Request, res: Response, next: NextFunction): void {
        const { name, lastname, username, email, password, city, province, role } = req.body;

        const validUser = new UserDTO();
        validUser.name = name;
        validUser.lastname = lastname;
        validUser.username = username;
        validUser.email = email;
        validUser.password = password;
        validUser.city = city;
        validUser.province = province;
        validUser.role = role;

        void validate(validUser).then(errors => {
            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
