import { AxiosResponse } from "axios";
import axiosInstance from "../api/axiosInstance";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post('auth/login', { username, password })
    }

    static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post('auth/register', { username, password })
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> { 
        return axiosInstance.post('auth/refresh')
    }
}