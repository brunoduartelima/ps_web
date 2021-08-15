import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Company {
    id: string;
    name: string;
    avatar_url: string;
}

interface AuthState {
    token: string;
    user: User;
    company: Company;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    company: Company;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
    updateCompany(company: Company): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@PsManager:token');
        const user = localStorage.getItem('@PsManager:user');
        const company = localStorage.getItem('@PsManager:company');

        if (token && user && company){
            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token, user: JSON.parse(user), company: JSON.parse(company) }
        };

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        const { token, user, company } = response.data;

        localStorage.setItem('@PsManager:token', token);
        localStorage.setItem('@PsManager:user', JSON.stringify(user));
        localStorage.setItem('@PsManager:company', JSON.stringify(company));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user, company });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@PsManager:token');
        localStorage.removeItem('@PsManager:user');
        localStorage.removeItem('@PsManager:company');

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@PsManager:user', JSON.stringify(user));

        setData({
            token: data.token,
            user,
            company: data.company
        });
    }, [setData, data.token, data.company]);

    const updateCompany = useCallback((company: Company) => {
        localStorage.setItem('@PsManager:company', JSON.stringify(company));

        setData({
            token: data.token,
            user: data.user,
            company
        });
    }, [setData, data.token, data.user]);

    return (
        <AuthContext.Provider value={{ user: data.user, company: data.company, signIn, signOut, updateUser, updateCompany }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');

    return context;
}