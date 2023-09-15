
import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

interface TokenState {
    accessToken: string | null;
}

const initialState: TokenState = {
    accessToken: null,
};

export const setToken = createAction<string|null>('SET_TOKEN');

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setToken, (state, action) => {
            state.accessToken = action.payload;
        })
});
export default userReducer;