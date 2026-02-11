// src/services/auth.js
import { AuthAPI } from "../services/api";

export const AuthService = {
    login: ({ email, password }) => AuthAPI.login({ email, password }),
    logout: () => AuthAPI.logout(),
    me: () => AuthAPI.me(),
};

