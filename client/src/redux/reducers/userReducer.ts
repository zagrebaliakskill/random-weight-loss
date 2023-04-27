import { createSlice, ThunkDispatch } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { AnyAction} from 'redux';

type AppDispatch = ThunkDispatch<any, any, AnyAction>;
const initialState = {
    username: '',
    balance: 0, 
    xp: 0, 
    isLoggedIn: false, 
    isAuthLoading: false,
    authErrorMsg: "",
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginLoading: (state) => {
            return {
                ...state,
                isAuthLoading: true,
            }
        },
        loginSuccess: (state, action) => {
            const user = {
                username: action.payload.user.name,
                balance: action.payload.user.balance,
                xp: action.payload.user.xp
            }
            return { ...state, ...user, isLoggedIn: true, isAuthLoading: false}
        },
        loginFailure: (state, action) => {
            if (action.payload) {
                return { ...state, isLoggedIn: false, isAuthLoading: false, authErrorMsg: action.payload}
            } else {
                return { ...state, isLoggedIn: false, isAuthLoading: false }
            }
            
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

export const { loginSuccess, loginFailure, logout, loginLoading, changeBalance, changeXp } = userSlice.actions;

export const login = (username: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(loginLoading())
    try {
        const response = await AuthService.login(username, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(loginSuccess(response.data));
    } catch (error: any) {
        let errorMsg = ''
        if (error.response.data.statusCode == 401) {
            errorMsg = "Неверный логин или пароль."
        } else {
            errorMsg = "Сервис авторизации недоступен в данный момент."
        }
        dispatch(loginFailure(errorMsg));
    }
};

export const checkAuth = () => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(loginLoading())
    try {
        const response = await AuthService.refresh();
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(""));
    }
};

export default userSlice