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
    RiArrowRightLine,
    RiUserSettingsLine
} from 'react-icons/ri';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { usePagination } from '../../hooks/pagination';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import CreateEmployeeModal from './CreateEmployeeModal';

import {
    Container,
    EmployeesContainer,
    ServicesContent,
    SearchContent,
    EmployeesContent,
    Employee,
    EmployeeOptions,
    EmployeeOptionsContent,
    OptionButton,
    DeleteContainer,
    DeleteContent,
    EmployeeData
} from './styles';

interface EmployeesData {
    id: string;
    name: string;
    salary: number;
    date_birth: Date;
    phone: string;
    active: boolean;
}

const Employees: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeesData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [paginationFlag, setPaginationFlag] = useState('');
    const [selectedShowEmployee, setSelectedShowEmployee] = useState<String[]>([]);
    const [modalRegistration, setModalRegistration] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const { currentPage, updateCurrentPage } = usePagination();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        api.get('/employees').then(response => {
            setEmployees(response.data);
        });
    }, []);

    useEffect(() => {
        try {
            if(paginationFlag === 'ListAll') {
                api.get(`/employees/search/list-all?page=${currentPage}`).then(
                    response => {
                        setEmployees(response.data[0])
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/employees/search/list-all?page=${currentPage}`);
            }
            if(paginationFlag === 'Search' && searchName.length) {
                api.get(`/employees/search?name=${searchName}&page=${currentPage}`).then(
                    response => {
                        setEmployees(response.data[0])
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/employees/search?name=${searchName}&page=${currentPage}`);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar colaboradores, tente novamente.',
            });
        }
    }, [currentPage, totalElements, history, paginationFlag, searchName, addToast]);

    const handleListAllEmployees = useCallback(async () => {
        try {
            const response = await api.get(`/employees/search/list-all?page=1`);
            history.push(`/employees/search/list-all?page=1`);
            setEmployees(response.data[0]);
            setTotalElements(Number(response.data[1]));
            setPaginationFlag('ListAll');
            updateCurrentPage(1);
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar colaboradores, tente novamente.',
            });
        }
    }, [history, updateCurrentPage, addToast]);

    const handleShowDataEmployee = useCallback((id: string) => {
        const alreadySelected = selectedShowEmployee.findIndex(employee => employee === id);

        if (alreadySelected > -1) {
            const filteredEmployee = selectedShowEmployee.filter(employee => employee !== id);
            
            setSelectedShowEmployee(filteredEmployee);

        } else {
            setSelectedShowEmployee([...selectedShowEmployee, id]);
        }
    }, [selectedShowEmployee]);

    const handleSearchEmployee = useCallback(async (event: KeyboardEvent<HTMLInputElement> ) => {
        try {
            const key = event.key;
            if(key === 'Enter' && searchName.length) {
                const response = await api.get(`/employees/search?name=${searchName}&page=1`);
                history.push(`/employees/search?name=${searchName}&page=1`);
                setEmployees(response.data[0]);
                setTotalElements(Number(response.data[1]));
                setPaginationFlag('Search');
                updateCurrentPage(1);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar colaboradores, tente novamente.',
            });
        }
    }, [history, searchName, updateCurrentPage, addToast]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await api.delete(`/employees/${id}`);

            setEmployees(oldEmployees => oldEmployees.filter(employee => employee.id !== id));

            addToast({
                type: 'success',
                title: 'Colaborador excluido',
                description: 'O colaborador foi excluido com sucesso.',
            });
        } catch(error) {
            addToast({
                type: 'error',
                title: 'Erro ao excluir',
                description: 'Ocorreu um erro ao excluir colaborador, tente novamente.',
            });
        } finally {
            setDeleteConfirmation(false);
        }
    }, [addToast]);

    return(
        <Container>
            <Header/>
            <EmployeesContainer>
                <ServicesContent>
                    <form onSubmit={e => e.preventDefault()}>
                        <SearchContent>
                            <div><RiSearchLine size={22} /></div>
                            <input type="text" name="name" placeholder="Procurar" onKeyPress={handleSearchEmployee} onChange={e => setSearchName(e.target.value)}/>
                        </SearchContent>
                    </form>
                    <div>
                        <button type="button" onClick={() => handleListAllEmployees()}>
                            <RiFileList3Line size={22} />
                            Listar todos
                        </button>
                        <button type="button" onClick={() => setModalRegistration(true)}>
                            <RiUserAddLine size={22} />
                            Cadastrar
                        </button>
                        <Link to="/users-employees">
                            <RiUserSettingsLine size={22} />
                            Usuários
                        </Link>
                    </div>
                </ServicesContent>
                <EmployeesContent>
                    { paginationFlag.length ? <h1>Resultados encontrados: { totalElements }</h1> : <h1>Cadastrados recentemente</h1> }
                    <ul>
                        { employees.length ? employees.map(employee => (
                            <Employee key={employee.id}>
                                <EmployeeOptions>
                                    <span>{employee.name}</span>
                                    <EmployeeOptionsContent>
                                        <OptionButton type="button" onClick={() => handleShowDataEmployee(employee.id)}>
                                            <div>
                                                {selectedShowEmployee.includes(employee.id) ?
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
                                                    <strong>Deseja realmente excluir esse colaborador ?</strong>
                                                    <div>
                                                        <button type="button" onClick={() => handleDelete(employee.id)}>Confirmar</button>
                                                        <button type="button" onClick={() => setDeleteConfirmation(false)}>Cancelar</button>
                                                    </div>
                                                </DeleteContent>
                                            </DeleteContainer>
                                        }
                                    </EmployeeOptionsContent>
                                </EmployeeOptions>
                                <EmployeeData isOpen={!selectedShowEmployee.includes(employee.id)} >
                                    <ul>
                                        <li><span>Data de nasc: </span>{employee.date_birth}</li>
                                        <li><span>Telefone: </span>{employee.phone}</li>
                                        <li><span>Salário: </span>R$ {employee.salary}</li>
                                        <li><span>Estado atual: </span>{employee.active ? 'Ativo' : 'Desligado'}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/employee/${employee.id}`}>Ver histórico completo<RiArrowRightLine size={24}/></Link>
                                    </div>
                                </EmployeeData>
                            </Employee>
                        )) : <span>Nenhum resultado encontrado</span> }
                    </ul>
                </EmployeesContent>
                { totalElements > 0 && <Pagination totalElements={totalElements}  /> }
            </EmployeesContainer>
            { modalRegistration && 
                <CreateEmployeeModal 
                    onClose={() => setModalRegistration(false)}
                /> 
            }
        </Container>
    )
}

export default Employees;