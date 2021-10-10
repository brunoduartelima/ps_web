import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { PaginationProvider } from './pagination';

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
        <ToastProvider>
            <PaginationProvider>
                {children}
            </PaginationProvider>
        </ToastProvider>
    </AuthProvider>
);

export default AppProvider;