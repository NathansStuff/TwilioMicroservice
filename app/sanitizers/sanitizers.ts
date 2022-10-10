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
