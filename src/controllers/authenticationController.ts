import asyncHandler from 'express-async-handler';
import { Response, Request } from 'express';
import {
    requestEmailCode,
    requestSMSCode,
    sendMessage,
    verifyEmailCode,
    verifySMSCode,
} from '../services/authenticationService';

// @desc Request SMS code
// @route POST /authentication/requestsms
// @access Private
export const requestSMSHandler = asyncHandler(async (req: Request, res: Response) => {
    const response = await requestSMSCode(req.body?.mobilePhone);

    res.status(200).json(response);
});

// @desc Request SMS code
// @route POST /authentication/requestsms
// @access Private
export const verifySMSHandler = asyncHandler(async (req: Request, res: Response) => {
    const response = await verifySMSCode(req.body?.mobilePhone, req.body?.code);

    res.status(200).json(response);
});

// @desc Request SMS code
// @route POST /authentication/requestsms
// @access Private
export const sendSMSHandler = asyncHandler(async (req: Request, res: Response) => {
    const response = await sendMessage(req.body?.mobilePhone, req.body?.message);

    res.status(200).json(response);
});

// @desc Request Email code
// @route POST /authentication/requestemail
// @access Private
export const requestEmailHandler = asyncHandler(async (req: Request, res: Response) => {
    const response = await requestEmailCode(req.body?.email);

    res.status(200).json(response);
});

// @desc Verify Email code
// @route POST /authentication/verifyemail
// @access Private
export const verifyEmailHandler = asyncHandler(async (req: Request, res: Response) => {
    const response = await verifyEmailCode(req.body?.email, req.body?.code);
    res.status(200).json(response);
});
