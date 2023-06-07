import React, { useCallback, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiReplyAllLine } from 'react-icons/ri';
import { usePagination } from '../../hooks/pagination';

import { Container, GoFirst, Page, GoLast } from './styles';

interface PaginationProps {
    totalElements: number;
}

interface PaginationNavigation {
    page: number;
}

const Pagination = ({ totalElements }: PaginationProps) => {
    const [totalPages, setTotalPages] = useState(0);
    const [showPages, setShowPages] = useState<number[]>([]);

    const { currentPage, updateCurrentPage } = usePagination();

    const calculateMaxVisible = useCallback(() => {
        let leftPages = (currentPage - Math.floor(5 / 2));
        let rigthPages = (currentPage + Math.floor(5 / 2));
        let total = (Math.ceil(totalElements / 10))

        if(leftPages < 1) {
            leftPages = 1;
            rigthPages = 5;
        }
        
        if(rigthPages > total) {
            leftPages = (total - (5 - 1));
            rigthPages = total;

            if(leftPages < 1)
                leftPages = 1;
        }

        let arrayPage = [];
        for(let page = leftPages; page <= rigthPages; page++) {
            arrayPage.push(page);
        }

        setTotalPages(total);
        setShowPages(arrayPage);
    }, [currentPage, totalElements]);

    useEffect(()=> {
        calculateMaxVisible();
    }, [currentPage, calculateMaxVisible]);

    const nextPage = useCallback(() => {
        let newState = currentPage + 1;

        if(newState > totalPages) {
            updateCurrentPage(newState - 1);
        } else {
            updateCurrentPage(newState);
        }
    },[totalPages, currentPage, updateCurrentPage]);
    
    const previousPage = useCallback(() => {
        let newState = currentPage - 1;

        if(newState < 1) {
            updateCurrentPage(newState + 1);
        } else {
            updateCurrentPage(newState);
        }
    },[currentPage, updateCurrentPage]);

    const goToPage = useCallback(({ page }: PaginationNavigation) => {
        if(page > totalPages)
            return updateCurrentPage(totalPages);
        
        if (page < 1)
            return updateCurrentPage(1);

        updateCurrentPage(page);

    },[totalPages, updateCurrentPage]);

    return (
        <Container>
            <GoFirst onClick={() => goToPage({ page: 1 })}><RiReplyAllLine size={22} /></GoFirst>
            <div onClick={() => previousPage()}><RiArrowLeftSLine size={22} /></div>
            <div>
                {showPages.map(index => {
                    return ( 
                        <Page 
                            isActual={currentPage === index ? true : false} 
                            key={index} 
                            onClick={() => goToPage({ page: index})}
                        >
                            { index }
                        </Page>
                    )
                })}
            </div>
            <div onClick={() => nextPage()}><RiArrowRightSLine size={22} /></div>
            <GoLast onClick={() => goToPage({ page: totalPages })}><RiReplyAllLine size={22} /></GoLast>
        </Container>
    )

}

export default Pagination;