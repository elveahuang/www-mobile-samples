import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    username: string;
}

const initialState: UserState = {
    username: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {},
        decrement: (state) => {},
    },
});

export const { increment, decrement } = userSlice.actions;

export default userSlice.reducer;
