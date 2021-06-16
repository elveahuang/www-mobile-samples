import zhCnIntl from '../locales/zh_cn.json';
import zhTwIntl from '../locales/zh_tw.json';
import enUsIntl from '../locales/en_us.json';
import { createIntl, createIntlCache, IntlShape } from 'react-intl';

export enum LangType {
    ZH_CN = 'zh-CN',
    ZH_TW = 'zh-TW',
    EN_US = 'en-US',
}

export const defaultLang = LangType.ZH_CN;

export const localeMessages = {
    [LangType.ZH_CN]: zhCnIntl,
    [LangType.ZH_TW]: zhTwIntl,
    [LangType.EN_US]: enUsIntl,
};

const cache = createIntlCache();

let intl: IntlShape;

export const createReactIntl = (lang: LangType = defaultLang) => {
    intl = createIntl(
        {
            locale: lang,
            messages: localeMessages[lang],
        },
        cache,
    );
    return intl;
};

export { intl };
