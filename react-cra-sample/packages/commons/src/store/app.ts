import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultLang, LangType } from '@commons/utils/i18n';
import { isDev } from '@commons/utils';
import applicationVersion from '@commons/constants';
import { defaultDirection, defaultTheme, DirectionType, setTheme, ThemeType } from '@commons/utils/theme';

export interface AppState {
    isLoading: boolean;
    lang: LangType;
    theme: ThemeType;
    direction: DirectionType;
    dark: boolean;
}

export const initialAppState: AppState = {
    isLoading: true,
    lang: defaultLang,
    theme: defaultTheme,
    direction: defaultDirection,
    dark: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        /**
         * 初始化应用
         */
        initialize: (state: AppState) => {
            if (isDev) {
                console.log(`Current Version = ${applicationVersion}`);
            }
            return { ...state, isLoading: false };
        },
        /**
         * 切换语言
         */
        changeLang: (state: AppState, action: PayloadAction<LangType>) => {
            return { ...state, lang: action.payload };
        },
        /**
         * 切换主题
         */
        changeTheme: (state: AppState, action: PayloadAction<ThemeType>) => {
            setTheme(action.payload);
            return { ...state, theme: action.payload };
        },
        /**
         * 切换对齐方式
         */
        changeDirection: (state: AppState, action: PayloadAction<DirectionType>) => {
            return { ...state, direction: action.payload };
        },
    },
});

export const { initialize, changeLang, changeTheme, changeDirection } = appSlice.actions;

export default appSlice.reducer;
