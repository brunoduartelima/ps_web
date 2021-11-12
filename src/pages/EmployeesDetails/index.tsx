import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';
import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { RiMoneyDollarBoxLine, RiSurveyLine } from 'react-icons/ri';
import { FiCalendar, FiPhone, FiUser } from 'react-icons/fi';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { maskMoney, maskPhone } from '../../utils/inputMasks';
import getValidationErrors from '../../utils/getValidationErrors';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    DocumentContent,
    ContactContent,
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Datepicker from '../../components/Datepicker';


interface EmployeeData {
    name: string;
    salary: number;
    date_birth: string;
    phone: string;
    active: string | boolean;
}

const EmployeesDetails: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [employee, setEmployee] = useState<EmployeeData>();
    const [phone, setPhone] = useState('');
    const [active, setActive] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState<Date>();

    const params = useParams();
    const { addToast } = useToast();

    const employeeId = stringify(params).replace('id=', '');

    useEffect(() => {
        api.get<EmployeeData>(`/employees/details/${employeeId}`).then(
            response => {
                const data = response.data;
                setEmployee(data);
                setPhone(data.phone);
                setActive(data.active === true ? 'true' : 'false');
                setSalary(maskMoney(String(data.salary)));
                setDate(parseISO(data.date_birth));
            }
        )
    }, [employeeId]);

    const handleSubmit = useCallback(async(data: EmployeeData) => {
        try {
            formRef.current?.setErrors({});

            data.salary = parseFloat(salary.replace('.', '').replace(',', '.'));
            data.active = data.active === 'true' ? true : false;

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                salary: Yup.number().required('Salário obrigatório'),
                phone: Yup.string().required('Telefone obrigatório').min(14, 'Contato deve possuir no mínimo 10 digitos'),
                date_birth: Yup.date().max(new Date(), 'Data inválida').required('Data de nascimento obrigatória'),
                active: Yup.boolean().required('Seleção obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.put(`/employees/${employeeId}`, data);
            const updatedEmployee = response.data;
            
            setEmployee(updatedEmployee);

            addToast({
                type: 'success',
                title: 'Atualização concluída',
                description: 'A atualização do colaborador foi um sucesso.',
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao atualizar colaborador, tente novamente.',
            });
        }
    }, [addToast, employeeId, salary]);

    const handleSelectActive = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const active = event.target.value;

        setActive(active);
    }, []);

    return (
        <Container>
            <Header />
            <Content>
                <Title>
                    <RiSurveyLine size={80}/>
                    <h1>Informações atuais | Colaborador</h1>
                </Title>
                <Form 
                    ref={formRef}
                    initialData={ employee && {
                        name: employee.name,
                        date_birth: employee.date_birth,
                    }}
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
                            value={salary}
                            onChange={e => setSalary(maskMoney(e.target.value))}
                            name="salary" 
                            placeholder="Salário"
                            icon={RiMoneyDollarBoxLine}
                        />
                        <label htmlFor="active">Estado atual</label>
                        <Select 
                            value={active} 
                            name="active"
                            onChange={handleSelectActive}
                        >
                            <option value="true">Ativo</option>
                            <option value="false">Desligado</option>
                        </Select>
                    </DocumentContent>

                    <Button type="submit">Atualizar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default EmployeesDetails;