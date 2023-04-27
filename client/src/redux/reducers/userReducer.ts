import { createSlice, ThunkDispatch } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { AnyAction} from 'redux';

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const initialState = { username: '', balance: 0, xp: 0, isLoggedIn: false}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const user = {
                username: action.payload.user.name,
                balance: action.payload.user.balance,
                xp: action.payload.user.xp
            }
            return { ...state, ...user, isLoggedIn: true }
        },
        loginFailure: (state) => {
            return { ...state, isLoggedIn: false }
        },
        logout: (state, action) => {
            return initialState
        },
        changeBalance: (state, action) => {
            return {
                ...state,
                balance: state.balance + action.payload
            }
        },
        changeXp: (state, action) => {
            return {
                ...state,
                xp: state.xp + action.payload
            }
        },
    },
})

export const { loginSuccess, loginFailure, logout, changeBalance, changeXp } = userSlice.actions;

export const login = (username: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
        const response = await AuthService.login(username, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const checkAuth = () => async (dispatch: AppDispatch): Promise<void> => {
    try {
        const response = await AuthService.refresh();
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        console.log(error)
        dispatch(loginFailure());
    }
};

export default userSlice