import Twilio from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import {
    sanitizeCode,
    sanitizeEmail,
    sanitizeMessage,
    sanitizeMobilePhone,
} from '../sanitizers/authenticationSanitizers';
import { EVerificationResponseStatus } from '../types/EVerificationResponseStatus';
import {
    IS_VERIFICATION_DISABLED,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_MESSAGING_SERVICE_SID,
    TWILIO_SERVICE_SID,
} from '../utils/config';

const twilioClient = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export interface EVerificationResponse {
    status: string;
    message: string;
    verification?: VerificationInstance | VerificationCheckInstance;
}

export function VerificationResponse(
    status: string,
    message: string,
    verification?: VerificationInstance | VerificationCheckInstance
): EVerificationResponse {
    return {
        status,
        message,
        verification,
    };
}

enum ChannelTypes {
    SMS = 'sms',
    EMAIL = 'email',
}

export async function requestSMSCode(mobilePhone: string): Promise<EVerificationResponse> {
    // sanitize input
    const sanitizedMobilePhone = sanitizeMobilePhone(mobilePhone);

    // If verification is disabled, return success
    if (IS_VERIFICATION_DISABLED) {
        return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Sending sms code bypassed');
    }

    // setup request
    const request = setupRequest(sanitizedMobilePhone, ChannelTypes.SMS);

    // Send sms
    const response = await twilioClient.verify.services(TWILIO_SERVICE_SID).verifications.create(request);

    // Check response
    if (response.status !== 'pending') {
        throw new Error('Sending SMS code request failed');
    }

    // Return response
    return VerificationResponse(
        EVerificationResponseStatus.SUCCESSFUL,
        'Sending SMS code request successful',
        response
    );
}

export async function verifySMSCode(mobilePhone: string, code: string): Promise<EVerificationResponse> {
    // sanitize input
    const sanitizedMobilePhone = sanitizeMobilePhone(mobilePhone);
    const sanitizedCode = sanitizeCode(code);

    // If verification is disabled, return success
    if (IS_VERIFICATION_DISABLED) {
        return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Verifying code bypassed');
    }

    // setup request
    const request = setupRequest(sanitizedMobilePhone, ChannelTypes.SMS, sanitizedCode);

    try {
        // Send sms
        const response = await twilioClient.verify.services(TWILIO_SERVICE_SID).verificationChecks.create(request);

        // Check response
        if (response.status === 'approved') {
            return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Borrower verified');
        }

        // If not approved, then it failed
        if (response.status === 'pending') {
            return VerificationResponse(
                EVerificationResponseStatus.INCORRECT_VERIFICATION_CODE,
                'Verification code is incorrect'
            );
        }

        // Final catch all errors, shouldn't happen
        return VerificationResponse(EVerificationResponseStatus.UNEXPECTED_ERROR, 'Unexpected error');
    } catch (error) {
        // Known twilio error message
        if (
            error.message.includes(
                `The requested resource /Services/${TWILIO_SERVICE_SID}/VerificationCheck was not found`
            ) === true
        ) {
            return VerificationResponse(
                EVerificationResponseStatus.INVALID_PARAMS,
                'Code cannot be checked because it was not sent'
            );
        }
        // Unknown error
        return VerificationResponse(
            EVerificationResponseStatus.UNEXPECTED_ERROR,
            'Unexpected error while checking code'
        );
    }
}

export async function sendMessage(mobilePhone: string, message: string): Promise<EVerificationResponse> {
    // sanitize input
    const sanitizedMobilePhone = sanitizeMobilePhone(mobilePhone);
    const sanitizedMessage = sanitizeMessage(message);

    // If verification is disabled, return success
    if (IS_VERIFICATION_DISABLED) {
        return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Sending message bypassed');
    }

    // send request
    const response = await twilioClient.messages.create({
        body: sanitizedMessage,
        to: sanitizedMobilePhone,
        messagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
    });

    if (response.status === 'accepted') {
        return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Message sent');
    }

    return VerificationResponse(EVerificationResponseStatus.UNEXPECTED_ERROR, 'Unexpected error');
}

export async function requestEmailCode(email: string): Promise<EVerificationResponse> {
    // sanitize input
    const sanitizedEmail = sanitizeEmail(email);

    // If verification is disabled, return success
    if (IS_VERIFICATION_DISABLED) {
        return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Sending email code bypassed');
    }

    // setup request
    const request = setupRequest(sanitizedEmail, ChannelTypes.EMAIL);

    // Send sms
    const response = await twilioClient.verify.services(TWILIO_SERVICE_SID).verifications.create(request);

    // Check response
    if (response.status !== 'pending') {
        throw new Error('Sending Email code request failed');
    }

    // Return response
    return VerificationResponse(
        EVerificationResponseStatus.SUCCESSFUL,
        'Sending Email code request successful',
        response
    );
}

export async function verifyEmailCode(email: string, code: string): Promise<EVerificationResponse> {
    // sanitize input
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedCode = sanitizeCode(code);

    // If verification is disabled, return success
    if (IS_VERIFICATION_DISABLED) {
        return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Verifying code bypassed');
    }

    // setup request
    const request = setupRequest(sanitizedEmail, ChannelTypes.EMAIL, sanitizedCode);

    try {
        // Send sms
        const response = await twilioClient.verify.services(TWILIO_SERVICE_SID).verificationChecks.create(request);

        // Check response
        if (response.status === 'approved') {
            return VerificationResponse(EVerificationResponseStatus.SUCCESSFUL, 'Borrower verified');
        }

        // If not approved, then it failed
        if (response.status === 'pending') {
            return VerificationResponse(
                EVerificationResponseStatus.INCORRECT_VERIFICATION_CODE,
                'Verification code is incorrect'
            );
        }

        // Final catch all errors, shouldn't happen
        return VerificationResponse(EVerificationResponseStatus.UNEXPECTED_ERROR, 'Unexpected error');
    } catch (error) {
        // Known twilio error message
        if (
            error.message.includes(
                `The requested resource /Services/${TWILIO_SERVICE_SID}/VerificationCheck was not found`
            ) === true
        ) {
            return VerificationResponse(
                EVerificationResponseStatus.INVALID_PARAMS,
                'Code cannot be checked because it was not sent'
            );
        }
        // Unknown error
        return VerificationResponse(
            EVerificationResponseStatus.UNEXPECTED_ERROR,
            'Unexpected error while checking code'
        );
    }
}

export function setupRequest(
    to: string,
    channel: ChannelTypes,
    code?: string
): {
    to: string;
    channel: ChannelTypes;
    CustomFriendlyName: string;
    code?: string;
} {
    return {
        to,
        channel,
        CustomFriendlyName: 'MyApp',
        code,
    };
}
