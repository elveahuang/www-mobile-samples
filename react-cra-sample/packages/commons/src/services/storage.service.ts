import { isEmpty } from 'lodash';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

/**
 *
 */
export const getItem = (key: string): string => localStorage.getItem(key) ?? '';
/**
 *
 */
export const removeItem = (key: string): void => localStorage.removeItem(key);
/**
 *
 */
export const setItem = (key: string, val: string): void => {
    if (!isEmpty(val)) {
        localStorage.setItem(key, val);
    } else {
        removeItem(key);
    }
};
/**
 *
 */
export const getAccessToken = (): string => getItem(ACCESS_TOKEN_KEY) ?? '';
/**
 *
 */
export const setAccessToken = (val: string): void => setItem(ACCESS_TOKEN_KEY, val);
/**
 *
 */
export const getRefreshToken = (): string => getItem(REFRESH_TOKEN_KEY) ?? '';
/**
 *
 */
export const setRefreshToken = (val: string): void => setItem(REFRESH_TOKEN_KEY, val);
/**
 *
 */
export const clear = () => localStorage.clear();
