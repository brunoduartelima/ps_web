import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { RiUserAddLine, RiCloseFill, RiMoneyDollarBoxLine } from 'react-icons/ri';
import { FiCalendar, FiPhone, FiUser } from 'react-icons/fi';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import { maskPhone } from '../../../utils/inputMasks';
import getValidationErrors from '../../../utils/getValidationErrors';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    ContactContent,
    DocumentContent
} from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

interface EmployeeData {
    name: string;
    salary: number;
    date_birth: Date;
    phone: string;
    active: string | boolean;
}

interface CreateEmployeeModaProps {
    onClose(): void;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModaProps> = ({ onClose }) => {
    const formRef = useRef<FormHandles>(null);
    const [phone, setPhone] = useState('');

    const { addToast } = useToast();

    const handleSubmit = useCallback(async(data: EmployeeData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                salary: Yup.number().required('Salário obrigatório'),
                phone: Yup.string().required('Telefone obrigatório').min(14, 'Contato deve possuir no mínimo 10 digitos'),
                date_birth: Yup.date().required('Data de nascimento obrigatória'),
                active: Yup.string().required('Seleção obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            data.active = data.active === 'true' ? true : false;

            await api.post('/employees', data);

            onClose();

            addToast({
                type: 'success',
                title: 'Cadastro concluído',
                description: 'O cadastro do colaborador foi um sucesso.',
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
                description: 'Ocorreu um erro ao cadastrar colaborador, tente novamente.',
            });
        }
    }, [addToast, onClose]);

    return (
        <Container>
            <Content>
                <button type="button" onClick={onClose}><RiCloseFill size={28} title="Fechar" /></button>
                <Title>
                    <RiUserAddLine size={80}/>
                    <h1>Cadastrar | Colaborador</h1>
                </Title>
                <Form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <div>
                            <label htmlFor="name">Nome</label>
                            <Input name="name" placeholder="Nome" icon={FiUser}/>
                        </div>
                        <div>

                        </div>
                        <div>
                            <label htmlFor="date_birth">Data de nascimento</label>
                            <Input  
                                name="date_birth" 
                                placeholder="Data de nascimento"
                                icon={FiCalendar}
                            >
                            </Input>
                        </div>
                    </NameContent>
                    <h1>Contato</h1>
                    <ContactContent>
                        <div>
                            <label htmlFor="phone">Número de contato</label>
                            <Input 
                                value={phone} 
                                onChange={e => setPhone(maskPhone(e.target.value))} 
                                type="tel" 
                                name="phone" 
                                placeholder="Contato"
                                icon={FiPhone}
                            />
                        </div>
                    </ContactContent>
                    <h1>Efetivação</h1>
                    <DocumentContent>
                        <label htmlFor="salary">Salário</label>
                        <Input  
                            name="salary" 
                            placeholder="Salário"
                            icon={RiMoneyDollarBoxLine}
                        />
                        <label htmlFor="active">Estado atual</label>
                        <Select name="active">
                            <option value="true">Ativo</option>
                            <option value="false">Desligado</option>
                        </Select>
                    </DocumentContent>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default CreateEmployeeModal;