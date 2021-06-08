import { configureStore } from '@reduxjs/toolkit';
//
import appReducer from '@/store/app';
import userReducer from '@/store/user';

export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export default store;
