import { isArray, isNull, isString } from 'lodash';
import Principal from '@commons/types/principal';
import validator from 'validator';
import isEmpty = validator.isEmpty;

/**
 * 检查当前用户是否拥有任意一个角色或者权限
 */
export const check = (user: Principal, authority: string | Array<string>, role: string | Array<string>): boolean => {
    if (isNull(user)) {
        return false;
    }
    if (isArray(role)) {
    } else if (isString(role) && isEmpty(role)) {
    }
    return false;
};

/**
 * 检查当前用户是否拥有任意一个角色
 */
export const hasAnyRole = (user: Principal, role: string | Array<string>): boolean => {
    if (isNull(user)) {
        return false;
    }
    if (isArray(role)) {
    } else if (isString(role) && isEmpty(role)) {
    }
    return false;
};

/**
 * 检查当前用户是否拥有任意一个权限
 */
export const hasAnyAuthority = (user: Principal, authority: string | Array<string>): boolean => {
    if (isNull(user)) {
        return false;
    }
    if (isArray(authority)) {
    } else if (isString(authority) && isEmpty(authority)) {
    }
    return false;
};
