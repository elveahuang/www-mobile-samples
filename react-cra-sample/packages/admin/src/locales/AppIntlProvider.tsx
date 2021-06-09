import { FC } from 'react';
import { useAppSelector } from '@/hooks';
import { createIntl, createIntlCache, RawIntlProvider, IntlShape } from 'react-intl';
import zh_cn from '@commons/locales/zh_cn.json';
import zh_tw from '@commons/locales/zh_tw.json';
import en_us from '@commons/locales/en_us.json';
import { LangType } from '@commons/types';

const cache = createIntlCache();
let intl: IntlShape;

const messages: { [key in LangType]: {} } = {
    [LangType.ZH_CN]: zh_cn,
    [LangType.ZH_TW]: zh_tw,
    [LangType.EN_US]: en_us,
};

const AppIntlProvider: FC = ({ children }) => {
    const lang = useAppSelector((state) => state.app.lang);
    intl = createIntl(
        {
            locale: lang,
            messages: messages[lang],
        },
        cache,
    );
    return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};

export default AppIntlProvider;

export { intl };
