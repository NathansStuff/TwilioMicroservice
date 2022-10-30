import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { AUTH_TOKEN } from '../utils/config';
import HttpException from '../utils/httpException';

// Client token must equal server token
// Does not distinguish between different users
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-api-key'];
    if (token !== AUTH_TOKEN) throw new HttpException('Unauthorized', 401);
    next();
});
