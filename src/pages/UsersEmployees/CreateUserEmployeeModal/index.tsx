import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { RiUserAddLine, RiCloseFill } from 'react-icons/ri';
import { FiMail } from 'react-icons/fi';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import { 
    Container, 
    Content, 
    Title,
    FormSection
} from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

interface UserEmployeeData {
    id: string;
    name: string;
}

interface CreateUserEmployeeModaProps {
    onClose(): void;
}

const CreateUserEmployeeModal: React.FC<CreateUserEmployeeModaProps> = ({ onClose }) => {
    const formRef = useRef<FormHandles>(null);
    const [employees, setEmployees] = useState<UserEmployeeData[]>([]);
    const [loading, setLoading] = useState(false);

    const { addToast } = useToast();

    useEffect(() => {
        api.get('/employees').then(response => {
            setEmployees(response.data);
        });
    }, []);

    const handleSubmit = useCallback(async(data: UserEmployeeData) => {
        try {
            setLoading(true);
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                employee_id: Yup.string().min(1).required('Selecione um colaborador'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users_employees', data);

            addToast({
                type: 'success',
                title: 'Cadastro concluído',
                description: 'O cadastro do usuário foi um sucesso.',
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao cadastrar usuário, tente novamente.',
            });
        } finally {
            setLoading(false);
            onClose();
        }
    }, [addToast, onClose]);

    return (
        <Container>
            <Content>
                <button type="button" onClick={onClose}><RiCloseFill size={28} title="Fechar" /></button>
                <Title>
                    <RiUserAddLine size={80}/>
                    <h1>Cadastrar | Usuário Colaborador</h1>
                </Title>
                <Form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <FormSection>
                        <div>
                            <label htmlFor="employee">Colaborador</label>
                            <Select name="employee_id">
                                <option value="">Selecione um Colaborador</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <Input 
                                type="email" 
                                name="email" 
                                placeholder="Coloque o principal endereço e-mail" 
                                icon={FiMail} 
                            />
                        </div>
                    </FormSection>
                    <p>
                        Obs: o usuário irá receber nesse endereço de e-mail 
                        fornecido uma notificação com um link, para que ele possar 
                        resetar a senha padrão e registrar uma nova senha.
                    </p>

                    <Button loading={loading} type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default CreateUserEmployeeModal;