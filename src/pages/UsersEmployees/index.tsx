import React, { useCallback, useEffect, useState } from 'react';
import { RiDeleteBin7Line, RiUser3Line, RiUserAddLine } from 'react-icons/ri';
import { format } from 'date-fns';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
    Container,
    UsersContent, 
    User,
    ButtonDelete,
    Employee,
    UserInfo,
    DeleteContainer,
    DeleteContent,
} from './styles';

import Header from '../../components/Header';
import CreateUserEmployeeModal from './CreateUserEmployeeModal'

interface UsersEmployeesData {
    id: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    employee: {
        name: string;
        active: boolean;
    }
}

const UsersEmployees: React.FC = () => {
    const [users, setUsers] = useState<UsersEmployeesData[]>([]);
    const [modalRegistration, setModalRegistration] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const { addToast } = useToast();

    useEffect(() => {
        api.get('/users_employees/search').then(response => {
            setUsers(response.data);
        })
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await api.delete(`/users_employees/${id}`);

            setUsers(oldUsers => oldUsers.filter(user => user.id !== id));

            addToast({
                type: 'success',
                title: 'Usuário excluido',
                description: 'O usuário foi excluido com sucesso.',
            });
        } catch(error) {
            addToast({
                type: 'error',
                title: 'Erro ao excluir',
                description: 'Ocorreu um erro ao excluir usuário, tente novamente.',
            });
        } finally {
            setDeleteConfirmation(false);
        }
    }, [addToast]);

    return (
        <>
            <Header/>
            <Container>
                <button type="button" onClick={() => setModalRegistration(true)}>
                    <RiUserAddLine size={22} />
                    Cadastrar
                </button>
                <h1>Colaboradores cadastrados com permissões de usuário</h1>
                <UsersContent>
                    { users.length ? users.map(user => (
                        <User key={user.id}>
                            <Employee>
                                <RiUser3Line size={80}/>
                                <div>
                                    <ButtonDelete type="button" onClick={() => setDeleteConfirmation(true)}>
                                        <RiDeleteBin7Line size={22} title="Excluir" />
                                    </ButtonDelete>
                                    <h2>Colaborador</h2>                  
                                    <strong>{user.employee.name}</strong>
                                    <strong>Estado atual: <span>{user.employee.active ? 'Ativo' : 'Desligado'}</span></strong>
                                </div>
                            </Employee>
                            <UserInfo>
                                <h2>Informações da conta</h2>
                                <strong>E-mail: <span>{user.email}</span></strong>
                                <strong>Criado: <span>{format(new Date(user.created_at), 'MM/dd/yyyy')}</span></strong>
                                <strong>Última atualização: <span>{format(new Date(user.updated_at), 'MM/dd/yyyy')}</span></strong>
                            </UserInfo>
                            { deleteConfirmation  && 
                                <DeleteContainer>
                                    <DeleteContent>
                                        <strong>Deseja realmente excluir esse usuário ?</strong>
                                        <div>
                                            <button type="button" onClick={() => handleDelete(user.id)}>Confirmar</button>
                                            <button type="button" onClick={() => setDeleteConfirmation(false)}>Cancelar</button>
                                        </div>
                                    </DeleteContent>
                                </DeleteContainer>
                            }
                        </User>
                    )) : <span>Nenhum colaborador cadastrado como usuário</span>}
                </UsersContent>
            </Container>
            { modalRegistration && 
                <CreateUserEmployeeModal 
                    onClose={() => setModalRegistration(false)}
                />
            }
        </>
    )
}

export default UsersEmployees;