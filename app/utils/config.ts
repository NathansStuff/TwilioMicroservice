import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 5000;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const AUTH_TOKEN = process.env.AUTH_TOKEN ?? 'secret';
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? '';
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? '';
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID ?? '';
export const IS_VERIFICATION_DISABLED =
    process.env.IS_VERIFICATION_DISABLED === 'true' ?? false;
