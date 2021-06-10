import { isEmpty, isElement } from 'lodash';
import { format, isAfter as dateIsAfter, isBefore as dateIsBefore, isSameYear, parseISO } from 'date-fns';

/**
 * 工具函数
 */
export const isDev = process.env.NODE_ENV === 'development';

export const isNotProd = process.env.NODE_ENV !== 'production';

const ua = window.navigator.userAgent.toLowerCase();

export const isWeixin = ua.indexOf('micromessenger') !== -1 && ua.indexOf('wxwork') === -1;

export const isWorkWeixin = ua.indexOf('micromessenger') !== -1 && ua.indexOf('wxwork') !== -1;

export const isDingtalk = ua.indexOf('dingtalk') !== -1;

export const isIos = ua.indexOf('like mac os x') > 0;

export const isAndroid = ua.indexOf('android') > 0;

const MIN_DATE: Date = new Date(1970, 1, 1, 0, 0, 0, 0);
const MAX_DATE: Date = new Date(9999, 12, 31, 23, 59, 59, 999);
const PATTERN_FULL_DATETIME: string = 'yyyy-MM-dd HH:mm:ss';
const PATTERN_DATETIME: string = 'yyyy-MM-dd HH:mm';
const PATTERN_DATE: string = 'yyyy-MM-dd';
const PATTERN_TIME: string = 'HH:mm:ss';
const PATTERN_HOUR: string = 'HH:mm';

const EMAIL_REGEXP: RegExp = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/;
const MOBILE_REGEXP: RegExp = /^[1][3-9][0-9]{9}$/;

/**
 * 判断是否是：有内容的字符串（空的字符串或只有空格的字符串返回 false ）
 *
 * @param {string} str 字符
 * @returns {boolean}
 */
export const isNullOrEmpty = (str: string): boolean => {
    return trim(str) === '';
};

/**
 * 指定日期是否是最大日期
 * @param {string} date
 * @returns {boolean}
 */
export const isMaxDate = (date: Date | string | number): boolean => {
    return (
        isEmpty(date) ||
        isSameYear(typeof date === 'string' ? parseISO(date) : date, MAX_DATE) ||
        dateIsAfter(typeof date === 'string' ? parseISO(date) : date, MAX_DATE)
    );
};

/**
 * 指定日期是否是最小日期
 * @param {string} date
 * @returns {boolean}
 */
export const isMinDate = (date: Date | string | number): boolean => {
    return (
        isEmpty(date) ||
        isSameYear(typeof date === 'string' ? parseISO(date) : date, MIN_DATE) ||
        dateIsBefore(typeof date === 'string' ? parseISO(date) : date, MIN_DATE)
    );
};

/**
 * 是否在当前日期之后
 * @param date
 */
export const isAfter = (date: Date | string | number): boolean => {
    date = typeof date === 'string' ? parseISO(date) : date;
    return dateIsAfter(new Date(), date);
};

/**
 * 是否在当前日期之前
 * @param date
 */
export const isBefore = (date: Date | string | number): boolean => {
    date = typeof date === 'string' ? parseISO(date) : date;
    return dateIsBefore(new Date(), date);
};

/**
 * 格式化完整日期
 *
 * @param {string} value    日期
 * @returns {string}
 */
export const formatFullDateTime = (value: Date | string | number): string => {
    return dateFormat(value, PATTERN_FULL_DATETIME);
};

/**
 * 格式化日期
 * yyyy-mm-dd hh:mm
 * @param {string} value    日期
 * @returns {string}
 */
export const formatDateTime = (value: Date | string | number): string => {
    return dateFormat(value, PATTERN_DATETIME);
};

/**
 * 格式化日期
 * yyyy-mm-dd
 * @param {string} value    日期
 * @returns {string}
 */
export const formatDate = (value: Date | string | number): string => {
    return dateFormat(value, PATTERN_DATE);
};

/**
 * 格式化时间
 * HH:mm:ss
 * @param {string} value    日期
 * @returns {string}
 */
export const formatTime = (value: Date | string | number): string => {
    return dateFormat(value, PATTERN_TIME);
};

/**
 * 格式化小时
 * HH:mm
 * @param value
 * @returns {string}
 */
export const formatHour = (value: Date | string | number): string => {
    return dateFormat(value, PATTERN_HOUR);
};

/**
 * 格式化日期
 *
 * @param {Date | string | number} date    日期
 * @param {string} pattern  格式
 * @returns {string}
 */
export const dateFormat = (date: Date | string | number, pattern: string): string => {
    if (date) {
        return format(typeof date === 'string' ? parseISO(date) : date, pattern);
    } else {
        return '';
    }
};

export const trim = (value: string): string => {
    if (value) {
        return value.replace(/(^\s*)|(\s*$)/g, '');
    } else {
        return '';
    }
};

/**
 * 剔除html标记
 * @param {string} value
 * @returns {string}
 */
export const trimHtmlTag = (value: string) => {
    if (trim(value) !== '') {
        return value.replace(/<[^>]+>/g, '');
    }
    return '';
};

/**
 * 格式化链接
 *
 * @param {string} url
 * @returns {string}
 */
export const formatUrl = (url: string): string => {
    return url.toLowerCase().includes('https') || url.toLowerCase().includes('http')
        ? url
        : process.env.REACT_APP_BASE_URL + url;
};

/**
 * 转换常用实体符号
 * @param str
 * @returns {string | *}
 */
export const convertHtmlChar = (str: string) => {
    // 加入常用解析
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&quot;/g, "'");
    str = str.replace(/&amp;/g, '&');

    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&#8226;/g, '•');

    return str;
};

/**
 * 是否函数对象
 * @param value
 * @returns {boolean}
 */
export const isconst = (value: any): boolean => {
    if (value) {
        return typeof value === 'function';
    } else {
        return false;
    }
};

/**
 * 获取字符串长度
 *
 * @returns {number}
 * @param str
 */
export const getStringLength = (str: string): number => {
    let strlength = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
            strlength++;
        } else {
            strlength += 2;
        }
    }
    return strlength;
};

/**
 * 判断视频或者音频
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isVideoOrAudio = (url: string): boolean => {
    return /.mp4/.test(url);
};

/**
 *
 */
export const stringToNumber = (str: string): number => {
    return Number(str);
};

/**
 * 判断邮箱格式
 *
 * @param {string} email
 * @returns {boolean}
 */
export const isEmail = (email: string): boolean => {
    return EMAIL_REGEXP.test(email);
};

/**
 * 判断手机号码格式
 *
 * @param {string} mobile
 * @returns {boolean}
 */
export const isMobile = (mobile: string): boolean => {
    return MOBILE_REGEXP.test(mobile);
};

/**
 * 判断是否在范围内
 *
 * @param {string} url
 * @param {string[]} excludeUrls
 * @returns {boolean}
 */
export const isExcluded = (url: string, excludeUrls: Array<string>): boolean => {
    return excludeUrls.some((i) => url.indexOf(i) !== -1);
};

/**
 * 判断promise
 *
 * @param {const} fun
 * @return {boolean}
 */
export const isPromise = <T = any>(fun: any): fun is Promise<T> => {
    return typeof fun === 'object' && fun.then;
};

/**
 * blob对象转base64
 *
 * @return {Promise<string>}
 * @param {Blob} blob
 */
export const transformBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target?.result as string);
        };
        reader.onerror = (err) => {
            reject(err);
        };
        reader.readAsDataURL(blob);
    });
};

/**
 * 休眠
 *
 * @return {Promise<string>}
 * @param time
 */
export const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

/**
 * 用于后台页面在页面有变动时动态设置iframe页面的高度
 */
export const dynIframeSize = () => {
    try {
        if (window && window.parent !== undefined) {
            const wrapper = window.parent.document.querySelector('.content-wrapper');
            const wrapperHeight = isElement(wrapper) ? wrapper.scrollHeight : 0;
            const contentHeight = window.document.body.scrollHeight;

            let main = window.parent.document.getElementById('mainFrame');
            if (isElement(main)) {
                main.style.minHeight = (contentHeight > wrapperHeight ? contentHeight : wrapperHeight) + 'px';
            }
        }
    } catch (e) {
        console.log(`dynIframeSize failed.`, e);
    }
};
