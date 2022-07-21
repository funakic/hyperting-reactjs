import React from 'react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { api } from '../services/api';

type User = {
    email: string;
    name: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('auth', {
                email,
                password
            });

            const { token } = response.data;

            setCookie(undefined, 'hyperting.token', token, {
                maxAge: 60 * 60 * 24 * 30,  // 30 days
                path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}