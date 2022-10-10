import asyncHandler from 'express-async-handler';
import { Response, Request } from 'express';
import {
    requestSMSCode,
    verifySMSCode,
} from '../services/authenticationService';

// @desc Request SMS code
// @route POST /authentication/requestsms
// @access Private
export const requestSMSHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const response = await requestSMSCode(req.body?.mobilePhone);

        res.status(200).json(response);
    }
);

// @desc Request SMS code
// @route POST /authentication/requestsms
// @access Private
export const verifySMSHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const response = await verifySMSCode(
            req.body?.mobilePhone,
            req.body?.code
        );

        res.status(200).json(response);
    }
);
