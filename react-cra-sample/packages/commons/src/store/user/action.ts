import { ActionType } from '@commons/store/type';
import User from '@commons/types/user';

export enum UserActionTypes {
    SET_USER = 'SET_USER',
}

export type UserActionSetUserAction = { type: UserActionTypes.SET_USER; user: User };

export const setUser = (user: User): UserActionSetUserAction => ({
    type: UserActionTypes.SET_USER,
    user: user,
});

export type UserAction = ActionType<typeof setUser>;
