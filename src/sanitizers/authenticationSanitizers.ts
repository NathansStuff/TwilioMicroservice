import { checkIsString, checkNotUndefined, checkMinLength, checkMaxLength, checkEmailRegex } from './generalSanitizer';

export function sanitizeMobilePhone(mobilePhone: string): string {
    // Types
    if (mobilePhone === null || mobilePhone === undefined) {
        throw new Error('mobilePhone is null or undefined');
    }
    if (mobilePhone.length !== 10) {
        throw new Error('mobilePhone is not 10 digits');
    }
    if (mobilePhone.match(/^[0-9]+$/) === null) {
        throw new Error('mobilePhone is not numeric');
    }

    // Attributes
    if (mobilePhone.match(/^04/) === null) {
        throw new Error('mobilePhone does not start with 04');
    }
    const sanitizedMobilePhone = mobilePhone.replace(/^0/, '+61'); // remove leading 0
    return sanitizedMobilePhone;
}

export function sanitizeCode(code: string): string {
    // Types
    if (code === null || code === undefined) {
        throw new Error('code is null or undefined');
    }
    if (code.length !== 6) {
        throw new Error('code is not 6 digits');
    }

    return code;
}

export function sanitizeMessage(message: string): string {
    // Types
    if (message === null || message === undefined) {
        throw new Error('message is null or undefined');
    }
    if (message.length > 160) {
        throw new Error('message is greater than 160 characters');
    }

    return message;
}

export function sanitizeEmail(email: string, name = 'email'): string {
    // Types
    checkIsString(email, name);
    checkNotUndefined(email, name);

    // Attributes
    email = email.trim();
    checkMinLength(email, name, 1);
    checkMaxLength(email, name, 100);
    if (checkEmailRegex(email) === null) {
        throw new Error(`${name} is not a valid email`);
    }

    return email;
}
