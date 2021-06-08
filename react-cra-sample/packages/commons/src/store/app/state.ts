import { defaultLang, LangType } from '@commons/types';
import { getAccessToken, getRefreshToken } from '@commons/services/storage.service';

export interface AppState {
    isLoading: boolean;
    lang: LangType;
    accessToken: string;
    refreshToken: string;
}

export const initialAppState: AppState = {
    isLoading: false,
    lang: defaultLang,
    accessToken: getAccessToken() ?? '',
    refreshToken: getRefreshToken() ?? '',
};
