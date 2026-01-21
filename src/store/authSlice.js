import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    userData: null,
    session: null,
    oauthProvider: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login:(state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        setOAuth2Session:(state, action) => {
            state.status = true;
            state.session = action.payload.session;
            state.oauthProvider = action.payload.provider;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.session = null;
            state.oauthProvider = null;
        }
    }
})
export const {login, setOAuth2Session, logout} = authSlice.actions;
export default authSlice.reducer;