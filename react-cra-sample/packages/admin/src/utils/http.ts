import { HttpInterceptors, post, ToastParameters, TokenString } from '@commons/utils/http';
import { IntlFormatters } from 'react-intl';
import { message } from 'antd';
import store from '@/store';
import { clear, setAccessToken, setRefreshToken } from '@commons/store/user';
import { intl } from '@/locales/AppIntlProvider';

class WebAppHttpInterceptors extends HttpInterceptors {
    clearToken() {
        store.dispatch(clear());
    }

    refreshToken(): Promise<TokenString> {
        return post('/auth/token', {
            grant_type: 'refresh_token',
            client_id: 'webapp',
            client_secret: 'webapp',
            refresh_token: store.getState().user.refreshToken,
        }).then((res) => {
            store.dispatch(setAccessToken(res.data.access_token));
            store.dispatch(setRefreshToken(res.data.refresh_token));
            return res.data.access_token;
        });
    }

    getAccessToken(): TokenString {
        return store.getState().user.accessToken;
    }

    toast(...args: ToastParameters) {
        let errMsg;
        if (typeof args[0] === 'string') {
            errMsg = args[0];
        } else if (typeof args[0] === 'object') {
            errMsg = intl
                ? intl.formatMessage(...(args as Parameters<IntlFormatters['formatMessage']>))
                : (args[0].defaultMessage as string);
        }
        message.error(errMsg).then();
    }
}

const interceptors = new WebAppHttpInterceptors();

export default interceptors;
