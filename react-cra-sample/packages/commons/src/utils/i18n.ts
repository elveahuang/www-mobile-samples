import zhCnIntl from '../locales/zh_cn.json';
import zhTwIntl from '../locales/zh_tw.json';
import enUsIntl from '../locales/en_us.json';
import { createIntl, createIntlCache, IntlShape } from 'react-intl';

/**
 *
 */
export enum LangType {
    ZH_CN = 'zh-CN',
    ZH_TW = 'zh-TW',
    EN_US = 'en-US',
}

/**
 * react-intl
 */
export const applicationLocaleMessages = {
    [LangType.ZH_CN]: zhCnIntl,
    [LangType.ZH_TW]: zhTwIntl,
    [LangType.EN_US]: enUsIntl,
};

/**
 * 默认语言
 */
export const defaultLang = LangType.ZH_CN;

const cache = createIntlCache();
let intl: IntlShape;

export const createReactIntl = (lang: LangType = defaultLang) => {
    intl = createIntl(
        {
            locale: lang,
            messages: applicationLocaleMessages[lang],
        },
        cache,
    );
    return intl;
};

export { intl };
