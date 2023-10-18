import { type Response } from 'express';

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

export class HttpResponse {
    Ok(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            msg: 'success',
            data,
        });
    }

    Created(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            msg: 'Created',
            data,
        });
    }

    BadRequest(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            msg: 'Bad Request',
            error: data,
        });
    }

    Unauthorized(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            msg: 'Unauthorized',
            error: data,
        });
    }

    Forbidden(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            msg: 'Forbidden',
            error: data,
        });
    }

    NotFound(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            msg: 'Not Found',
            error: data,
        });
    }

    Error(res: Response, data?: unknown): Response {
        return res.status(HttpStatus.INTERNAL_SERVER).json({
            status: HttpStatus.INTERNAL_SERVER,
            msg: 'Internal Server Error',
            error: data,
        });
    }
}
