import React, { createContext, useCallback, useContext, useState } from 'react';

interface PaginationContextData {
    updateCurrentPage(page: number): void;
    currentPage: number;
}

const PaginationContext = createContext<PaginationContextData>({} as PaginationContextData);

export const PaginationProvider: React.FC = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const updateCurrentPage = useCallback((page: number) => {
        if(page > 0)
            setCurrentPage(page);
    }, []);

    return (
        <PaginationContext.Provider value={{ updateCurrentPage, currentPage }} >
            { children }
        </PaginationContext.Provider> 
    );
}

export function usePagination(): PaginationContextData {
    const context = useContext(PaginationContext);

    if (!context)
        throw new Error('usePagination must be used within a PaginationProvider');

    return context;
}