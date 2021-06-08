import { Reducer } from 'redux';
import { AppState, initialAppState } from '@commons/store/app/state';
import { AppActionType, AppActionTypes } from '@commons/store/app/action';

const reducer: Reducer<AppState, AppActionType> = (state = initialAppState, action) => {
    switch (action.type) {
        case AppActionTypes.SET_ACCESS_TOKEN:
            console.log('setApplicationAccessToken...reducer');
            return { ...state, accessToken: action.accessToken };
        case AppActionTypes.SET_REFRESH_TOKEN:
            console.log('setApplicationRefreshToken...reducer');
            return { ...state, refreshToken: action.refreshToken };
        case AppActionTypes.SET_LOADING:
            console.log('setLoading...reducer');
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
};

export default reducer;
