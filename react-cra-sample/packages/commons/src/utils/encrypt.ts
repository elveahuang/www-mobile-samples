import * as crypto from 'crypto-js';

/**
 * 加密
 */
export const encrypt = (value: string) => {
    return crypto.AES.encrypt(value, 'sunlearning').toString();
};

/**
 * 解密
 */
export const decrypt = (value: string) => {
    const bytes = crypto.AES.decrypt(value, 'sunlearning');
    return bytes.toString(crypto.enc.Utf8);
};
