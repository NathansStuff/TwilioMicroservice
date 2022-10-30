import HttpException from '../utils/httpException';

export function checkIsNumber(numberToCheck: number | string, name: string): number {
    const number = parseInt(numberToCheck.toString());
    if (isNaN(number)) {
        throw new HttpException(`${name} is not a number`, 400);
    }
    if (typeof number !== 'number') {
        throw new HttpException(`${name} is not a number`, 400);
    }
    if (number === 0) {
        throw new HttpException(`${name} is 0`, 400);
    }
    return number;
}

export function sanitizeEmail(email: string, name: string): string {
    // Types
    checkIsString(email, name);
    checkNotUndefined(email, name);

    // Attributes
    email = email.trim();
    checkMinLength(email, name, 1);
    checkMaxLength(email, name, 100);
    if (checkEmailRegex(email) == null) {
        throw new HttpException(`${name} is not a valid email`, 400);
    }

    return email;
}

export function checkEmailRegex(email: string): RegExpMatchArray | null {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function checkMinLength(string: string, name: string, min: number): void {
    if (string.length < min) {
        throw new HttpException(`${name} must be atleast ${min} characters`, 400);
    }
}

export function checkIsString(string: string, name: string): void {
    if (typeof string !== 'string') {
        throw new HttpException(`${name} is not a string`, 400);
    }
}

export function checkNotUndefined(value: unknown, name: string): void {
    if (value === undefined) {
        throw new HttpException(`${name} is undefined`, 400);
    }
}

export function checkMaxLength(string: string, name: string, max: number): void {
    if (string.length > max) {
        throw new HttpException(`${name} must be less than ${max} characters`, 400);
    }
}

export function sanitizeString(string: string, name: string, min?: number, max?: number): string {
    // Types
    checkIsString(string, name);
    checkNotUndefined(string, name);

    // Attributes
    string = string.trim();
    if (typeof min === 'number') {
        checkMinLength(string, name, min);
    }
    if (typeof max === 'number') {
        checkMaxLength(string, name, max);
    }

    return string;
}
