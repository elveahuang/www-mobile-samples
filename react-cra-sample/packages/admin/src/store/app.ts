import { defaultLang, LangType } from '@commons/types';
import { getAccessToken, getRefreshToken } from '@commons/services/storage.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        test: (state: AppState, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            console.log(`Hello ${action.payload}`);
        },
    },
});

export const { test } = appSlice.actions;

export default appSlice.reducer;
