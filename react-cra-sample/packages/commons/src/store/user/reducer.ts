import { Reducer } from 'redux';
import { UserState, initialUserState } from '@commons/store/user/state';
import { UserAction, UserActionTypes } from '@commons/store/user/action';

const reducer: Reducer<UserState, UserAction> = (state = initialUserState, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
