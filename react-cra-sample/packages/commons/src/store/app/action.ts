import { setAccessToken, setRefreshToken } from '@commons/services/storage.service';
import { ActionType } from '@commons/store/type';

export enum AppActionTypes {
    SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
    SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
    SET_LOADING = 'SET_LOADING',
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
    CHANGE_THEME = 'CHANGE_THEME',
}

export const setApplicationAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
    return <const>{
        type: AppActionTypes.SET_ACCESS_TOKEN,
        accessToken,
    };
};

export const setApplicationRefreshToken = (refreshToken: string) => {
    setRefreshToken(refreshToken);
    return <const>{
        type: AppActionTypes.SET_REFRESH_TOKEN,
        refreshToken,
    };
};

export const setLoading = (isLoading: boolean) => {
    return <const>{
        type: AppActionTypes.SET_LOADING,
        isLoading,
    };
};

export type AppActionType =
    | ActionType<typeof setApplicationAccessToken>
    | ActionType<typeof setApplicationRefreshToken>
    | ActionType<typeof setLoading>;

export type AppActionFnType = typeof setApplicationAccessToken | typeof setApplicationRefreshToken | typeof setLoading;
