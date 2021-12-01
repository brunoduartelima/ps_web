import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    RiSearchLine,
    RiBook2Line, 
    RiBookOpenLine,
    RiFileList3Line,
    RiEdit2Line,
    RiDeleteBin7Line,
    RiArrowRightLine,
    RiAddFill
} from 'react-icons/ri';

import api from '../../services/api';
import { usePagination } from '../../hooks/pagination';
import { useToast } from '../../hooks/toast';
import { maskMoney } from '../../utils/inputMasks';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

import {
    Container,
    SalesContainer,
    ServicesContent,
    SearchContent,
    SalesContent,
    Sale,
    SaleOptions,
    SaleOptionsContent,
    OptionButton,
    DeleteContainer,
    DeleteContent,
    SaleData
} from './styles';
import { format } from 'date-fns';

interface JobsData {
    id: string;
    name: string;
    description?: string;
    price: number;
    average_time: string;
}

interface SalesData {
    id: string;
    type: string;
    description?: string;
    date: Date;
    customer?: {
        name: string;
    };
    sale_employees: [];
    sale_products?: [];
    sale_jobs?: [];
}

const Sales: React.FC = () => {
    const [sales, setSales] = useState<SalesData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [paginationFlag, setPaginationFlag] = useState('');
    const [selectedShowSale, setSelectedShowSale] = useState<String[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const { currentPage, updateCurrentPage } = usePagination();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        api.get('/sales').then(response => {
            setSales(response.data);
        })
    }, []);

    useEffect(() => {
        try {
            if(paginationFlag === 'ListAll') {
                api.get(`/sales/search/list-all?page=${currentPage}`).then(
                    response => {
                        setSales(response.data[0]);
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/sales/search/list-all?page=${currentPage}`);
            }
            if(paginationFlag === 'Search' && searchName.length) {
                api.get(`/sales/search?name=${searchName}&page=${currentPage}`).then(
                    response => {
                        setSales(response.data[0]);
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/sales/search?name=${searchName}&page=${currentPage}`);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar as vendas, tente novamente.',
            });
        }
    }, [currentPage, totalElements, history, paginationFlag, searchName, addToast]);

    const handleListAllSales = useCallback(async () => {
        try {
            const response = await api.get(`/sales/search/list-all?page=1`);
            history.push(`/sales/search/list-all?page=1`);
            setSales(response.data[0]);
            setTotalElements(Number(response.data[1]));
            setPaginationFlag('ListAll');
            updateCurrentPage(1);
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar as vendas, tente novamente.',
            });
        }
    }, [history, updateCurrentPage, addToast]);

    const handleShowDataSale = useCallback((id: string) => {
        const alreadySelected = selectedShowSale.findIndex(sale => sale === id);

        if (alreadySelected > -1) {
            const filteredSale = selectedShowSale.filter(sale => sale !== id);
            
            setSelectedShowSale(filteredSale);

        } else {
            setSelectedShowSale([...selectedShowSale, id]);
        }
    }, [selectedShowSale]);

    const handleSearchSale = useCallback(async (event: KeyboardEvent<HTMLInputElement> ) => {
        try {
            const key = event.key;
            if(key === 'Enter' && searchName.length) {
                const response = await api.get(`/sales/search?name=${searchName}&page=1`);
                history.push(`/sales/search?name=${searchName}&page=1`);
                setSales(response.data[0]);
                setTotalElements(Number(response.data[1]));
                setPaginationFlag('Search');
                updateCurrentPage(1);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar as vendas, tente novamente.',
            });
        }
    }, [history, searchName, updateCurrentPage, addToast]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await api.delete(`/sales/${id}`);

            setSales(oldSales => oldSales.filter(sale => sale.id !== id));

            addToast({
                type: 'success',
                title: 'Venda excluida',
                description: 'A venda foi excluida com sucesso.',
            });
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao excluir',
                description: 'Ocorreu um erro ao excluir a venda, tente novamente.',
            });
        } finally {
            setDeleteConfirmation(false);
        }
    }, [addToast]);

    return(
        <Container>
            <Header/>
            <SalesContainer>
                <ServicesContent>
                    <form onSubmit={e => e.preventDefault()}>
                        <SearchContent>
                            <div><RiSearchLine size={22} /></div>
                            <input type="text" name="name" placeholder="Procurar" onKeyPress={handleSearchSale} onChange={e => setSearchName(e.target.value)}/>
                        </SearchContent>
                    </form>
                    <div>
                        <button type="button" onClick={() => handleListAllSales()}>
                            <RiFileList3Line size={22} />
                            Listar todos
                        </button>
                        <Link to="/register-sale">
                            <RiAddFill size={22} />
                            Cadastrar
                        </Link>
                    </div>
                </ServicesContent>
                <SalesContent>
                    { paginationFlag.length ? <h1>Resultados encontrados: { totalElements }</h1> : <h1>Cadastrados recentemente</h1> }
                    <ul>
                        { sales.length ? sales.map(sale => (
                            <Sale key={sale.id}>
                                <SaleOptions>
                                    <span>{sale.id}</span>
                                    <SaleOptionsContent>
                                        <OptionButton type="button" onClick={() => handleShowDataSale(sale.id)}>
                                            <div>
                                                {selectedShowSale.includes(sale.id) ?
                                                <RiBookOpenLine size={22} title="Fechar" /> : 
                                                <RiBook2Line size={22} title="Mostrar" /> }
                                            </div>    
                                        </OptionButton>
                                        <OptionButton type="button">
                                            <RiEdit2Line size={24} title="Editar" />
                                        </OptionButton>
                                        <OptionButton type="button" onClick={() => setDeleteConfirmation(true)}>
                                            <RiDeleteBin7Line size={22} title="Excluir" />
                                        </OptionButton>
                                        { deleteConfirmation  && 
                                            <DeleteContainer>
                                                <DeleteContent>
                                                    <strong>Deseja realmente excluir essa venda ?</strong>
                                                    <div>
                                                        <button type="button" onClick={() => handleDelete(sale.id)}>Confirmar</button>
                                                        <button type="button" onClick={() => setDeleteConfirmation(false)}>Cancelar</button>
                                                    </div>
                                                </DeleteContent>
                                            </DeleteContainer>
                                        }
                                    </SaleOptionsContent>
                                </SaleOptions>
                                <SaleData isOpen={!selectedShowSale.includes(sale.id)} >
                                    <ul>
                                        <li><span>Cliente: </span>{sale.customer ? sale.customer.name : 'não identificado'}</li>
                                        <li><span>Descrição: </span>{sale.description}</li>
                                        <li><span>Forma de pagamento: </span>{sale.type}</li>
                                        <li><span>Valor total: </span>R$ {maskMoney(String(1111))}</li>
                                        <li><span>Data: </span>{format(new Date(sale.date), 'MM/dd/yyyy')}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/sale/${sale.id}`}>Ver histórico completo<RiArrowRightLine size={24}/></Link>
                                    </div>
                                </SaleData>
                            </Sale>
                        )) : <span>Nenhum resultado encontrado</span> }
                    </ul>
                </SalesContent>
                { totalElements > 0 && <Pagination totalElements={totalElements}  /> }
            </SalesContainer>
        </Container>
    )
}

export default Sales;