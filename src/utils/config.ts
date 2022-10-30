import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

assert.ok(process.env.PORT, 'PORT must be set');
export const PORT = process.env.PORT;

assert.ok(process.env.NODE_ENV, 'NODE_ENV must be set');
export const NODE_ENV = process.env.NODE_ENV;

assert.ok(process.env.AUTH_TOKEN, 'AUTH_TOKEN must be set');
export const AUTH_TOKEN = process.env.AUTH_TOKEN;

assert.ok(process.env.TWILIO_ACCOUNT_SID, 'TWILIO_ACCOUNT_SID must be set');
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

assert.ok(process.env.TWILIO_AUTH_TOKEN, 'AUTH_TOKEN must be set');
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

assert.ok(process.env.TWILIO_SERVICE_SID, 'TWILIO_SERVICE_SID must be set');
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;

assert.ok(process.env.IS_VERIFICATION_DISABLED, 'AUTH_TIS_VERIFICATION_DISABLEDOKEN must be set');
export const IS_VERIFICATION_DISABLED = process.env.IS_VERIFICATION_DISABLED === 'true' ?? false;

assert.ok(process.env.TWILIO_MESSAGING_SERVICE_SID, 'TWILIO_MESSAGING_SERVICE_SID must be set');
export const TWILIO_MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;
