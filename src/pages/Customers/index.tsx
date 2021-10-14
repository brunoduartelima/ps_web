import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    RiSearchLine,
    RiBook2Line, 
    RiBookOpenLine, 
    RiUserAddLine, 
    RiFileList3Line,
    RiEdit2Line,
    RiDeleteBin7Line,
    RiArrowRightLine
} from 'react-icons/ri';

import api from '../../services/api';
import { usePagination } from '../../hooks/pagination';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import CreateCustomerModal from './CreateCustomerModal';

import {
    Container,
    CustomersContainer,
    ServicesContent,
    SearchContent,
    CustomersContent,
    Customer,
    CustomerOptions,
    CustomerOptionsContent,
    DeleteContainer,
    DeleteContent,
    CustomerData
} from './styles';
import { useToast } from '../../hooks/toast';

interface CustomersData {
    id: string;
    name: string;
    cpf: string;
    address: string;
    address_number: string;
    neighborhood: string;
    cep: string;
    sex: string;
    phone: string;
    date_birth: Date;
    email: string;
}

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<CustomersData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [paginationFlag, setPaginationFlag] = useState('');
    const [selectedShowCustomer, setSelectedShowCustomer] = useState<String[]>([]);
    const [modalRegistration, setModalRegistration] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const { currentPage, updateCurrentPage } = usePagination();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        api.get('/customers').then(response => {
            setCustomers(response.data);
        })
    }, []);

    useEffect(() => {
        if(paginationFlag === 'ListAll') {
            api.get(`/customers/search/list-all?page=${currentPage}`).then(
                response => {
                    setCustomers(response.data[0])
                    setTotalElements(Number(response.data[1]));
                }
            )

            history.push(`/customers/search/list-all?page=${currentPage}`);
        }
        if(paginationFlag === 'Search' && searchName.length) {
            api.get(`/customers/search?name=${searchName}&page=${currentPage}`).then(
                response => {
                    setCustomers(response.data[0])
                    setTotalElements(Number(response.data[1]));
                }
            )

            history.push(`/customers/search?name=${searchName}&page=${currentPage}`);
        }

    }, [currentPage, totalElements, history, paginationFlag, searchName]);

    const handleListAllCustomers = useCallback(async () => {
        try {
            const response = await api.get(`/customers/search/list-all?page=1`);
            history.push(`/customers/search/list-all?page=1`);
            setCustomers(response.data[0]);
            setTotalElements(Number(response.data[1]));
            setPaginationFlag('ListAll');
            updateCurrentPage(1);
        } catch {

        }
    }, [history, updateCurrentPage]);

    const handleShowDataCustomer = useCallback((id: string) => {
        const alreadySelected = selectedShowCustomer.findIndex(customer => customer === id);

        if (alreadySelected > -1) {
            const filteredCustomer = selectedShowCustomer.filter(customer => customer !== id);
            
            setSelectedShowCustomer(filteredCustomer);

        } else {
            setSelectedShowCustomer([...selectedShowCustomer, id]);
        }
    }, [selectedShowCustomer]);

    const handleSearchCustomer = useCallback(async (event: KeyboardEvent<HTMLInputElement> ) => {
        try {
            const key = event.key;
            if(key === 'Enter' && searchName.length) {
                const response = await api.get(`/customers/search?name=${searchName}&page=1`);
                history.push(`/customers/search?name=${searchName}&page=1`);
                setCustomers(response.data[0]);
                setTotalElements(Number(response.data[1]));
                setPaginationFlag('Search');
                updateCurrentPage(1);
            }
        } catch (error) {
            
        }
    }, [history, searchName, updateCurrentPage]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await api.delete(`/customers/${id}`);

            setCustomers(oldCustomers => oldCustomers.filter(customer => customer.id !== id));

            addToast({
                type: 'success',
                title: 'Cliente excluido',
                description: 'O cliente foi excluido com sucesso.',
            });
        } catch(error) {
            addToast({
                type: 'error',
                title: 'Erro ao excluir',
                description: 'Ocorreu um erro ao excluir cliente, tente novamente.',
            });
        } finally {
            setDeleteConfirmation(false);
        }
    }, [addToast]);

    return(
        <Container>
            <Header/>
            <CustomersContainer>
                <ServicesContent>
                    <form onSubmit={e => e.preventDefault()}>
                        <SearchContent>
                            <div><RiSearchLine size={22} /></div>
                            <input type="text" name="name" placeholder="Procurar" onKeyPress={handleSearchCustomer} onChange={e => setSearchName(e.target.value)}/>
                        </SearchContent>
                    </form>
                    <div>
                        { totalElements > 0  && <span>Resultados encontrados: { totalElements }</span> }
                        <button type="button" onClick={() => handleListAllCustomers()}>
                            <RiFileList3Line size={22} />
                            Listar todos
                        </button>
                        <button type="button" onClick={() => setModalRegistration(true)}>
                            <RiUserAddLine size={22} />
                            Cadastrar
                        </button>
                    </div>
                </ServicesContent>
                <CustomersContent>
                    { paginationFlag.length ? <h1>Resultados encontrados</h1> : <h1>Cadastrados recentemente</h1> }
                    <ul>
                        { customers.length ? customers.map(customer => (
                            <Customer key={customer.id}>
                                <CustomerOptions>
                                    <span>{customer.name}</span>
                                    <CustomerOptionsContent>
                                        <button type="button" onClick={() => handleShowDataCustomer(customer.id)}>
                                            <div>
                                                {selectedShowCustomer.includes(customer.id) ?
                                                <RiBookOpenLine size={22} title="Fechar" /> : 
                                                <RiBook2Line size={22} title="Mostrar" /> }
                                            </div>    
                                        </button>
                                        <button type="button">
                                            <RiEdit2Line size={24} title="Editar" />
                                        </button>
                                        <button type="button" onClick={() => setDeleteConfirmation(true)}>
                                            <RiDeleteBin7Line size={22} title="Excluir" />
                                        </button>
                                        { deleteConfirmation  && 
                                            <DeleteContainer>
                                                <DeleteContent>
                                                    <strong>Deseja realmente excluir esse cliente ?</strong>
                                                    <div>
                                                        <button type="button" onClick={() => handleDelete(customer.id)}>Confirmar</button>
                                                        <button type="button" onClick={() => setDeleteConfirmation(false)}>Cancelar</button>
                                                    </div>
                                                </DeleteContent>
                                            </DeleteContainer>
                                        }
                                    </CustomerOptionsContent>
                                </CustomerOptions>
                                <CustomerData isOpen={!selectedShowCustomer.includes(customer.id)} >
                                    <ul>
                                        <li><span>Data de nasc: </span>{customer.date_birth}</li>
                                        <li><span>Telefone: </span>{customer.phone}</li>
                                        <li><span>Email: </span>{customer.email}</li>
                                        <li><span>CPF: </span>{customer.cpf}</li>
                                        <strong>Endereço</strong>
                                        <li><span>Rua: </span>{customer.address}</li>
                                        <li><span>Número: </span>{customer.address_number}</li>
                                        <li><span>Bairro: </span>{customer.neighborhood}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/customer/${customer.id}`}>Ver histórico completo<RiArrowRightLine size={24}/></Link>
                                    </div>
                                </CustomerData>
                            </Customer>
                        )) : <span>Nenhum resultado encontrado</span> }
                    </ul>
                </CustomersContent>
                { totalElements > 0 && <Pagination totalElements={totalElements}  /> }
            </CustomersContainer>
            { modalRegistration && <CreateCustomerModal onClose={() => setModalRegistration(false)} /> }
        </Container>
    )
}

export default Customers;