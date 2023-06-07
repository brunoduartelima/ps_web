import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { PaginationProvider } from './pagination';

type AppProviderProps = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => (
    <AuthProvider>
        <ToastProvider>
            <PaginationProvider>
                {children}
            </PaginationProvider>
        </ToastProvider>
    </AuthProvider>
);

export default AppProvider;