import dotenv from 'dotenv';
import { checkValueExists } from './helpers';
dotenv.config();

export const PORT = process.env.PORT ?? 5000;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const AUTH_TOKEN = process.env.AUTH_TOKEN ?? 'secret';
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? 'secret';
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? 'secret';
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID ?? 'secret';
export const IS_VERIFICATION_DISABLED =
    process.env.IS_VERIFICATION_DISABLED === 'true' ?? false;

export function checkEnvVariables(): void {
    if (process.env.PORT === undefined) {
        console.log('Warning: PORT is not set, using default value');
    }

    if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'development'
    ) {
        throw new Error(
            'NODE_ENV must be set to either "production" or "development"'
        );
    }

    if (!checkValueExists(process.env.AUTH_TOKEN)) {
        throw new Error('AUTH_TOKEN must be set');
    }

    if (!checkValueExists(process.env.TWILIO_ACCOUNT_SID)) {
        throw new Error('TWILIO_ACCOUNT_SID must be set');
    }

    if (!checkValueExists(process.env.TWILIO_AUTH_TOKEN)) {
        throw new Error('TWILIO_AUTH_TOKEN must be set');
    }

    if (!checkValueExists(process.env.TWILIO_SERVICE_SID)) {
        throw new Error('TWILIO_SERVICE_SID must be set');
    }

    if (
        process.env.IS_VERIFICATION_DISABLED !== 'false' &&
        process.env.IS_VERIFICATION_DISABLED !== 'true'
    ) {
        throw new Error(
            'IS_VERIFICATION_DISABLED must be set to either "true" or "false"'
        );
    }
}
