import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { AUTH_TOKEN } from '../utils/config';
import HttpException from '../utils/httpException';

// Client token must equal server token
// Does not distinguish between different users
export const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // expect {headers: {authorization: "Bearer token"}}
        if (
            req.headers.authorization === null ||
            req.headers.authorization === '' ||
            req.headers.authorization === undefined ||
            !req.headers.authorization.startsWith('Bearer ')
        ) {
            throw new HttpException('Unauthorized', 401);
        }

        const token = req.headers.authorization.split(' ')[1];
        if (token !== AUTH_TOKEN) throw new HttpException('Unauthorized', 401);
        next();
    }
);
