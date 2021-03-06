import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';
import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { RiCommunityLine, RiHome4Line, RiRoadMapLine, RiSurveyLine } from 'react-icons/ri';
import { FiCreditCard, FiMail, FiPhone, FiUser } from 'react-icons/fi';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { maskCpf, maskPhone, maskCep } from '../../utils/inputMasks';
import getValidationErrors from '../../utils/getValidationErrors';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    DocumentContent,
    ContactContent,
    AddressContent
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Datepicker from '../../components/Datepicker';

interface CustomerData {
    name: string;
    cpf: string;
    sex: 'Masculino' | 'Feminino';
    email: string;
    phone: string;
    address: string;
    address_number: string;
    neighborhood: string;
    cep: string;
    date_birth: string;
}

const CustomersDetails: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [customer, setCustomer] = useState<CustomerData>();
    const [document, setDocument] = useState('');
    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [sex, setSex] = useState('');
    const [date, setDate] = useState<Date>();

    const params = useParams();
    const { addToast } = useToast();

    const customer_id = stringify(params).replace('id=', '');

    useEffect(() => {
        api.get<CustomerData>(`/customers/details/${customer_id}`).then(
            response => {
                const data_customer = response.data;
                setCustomer(data_customer);
                setDocument(data_customer.cpf);
                setPhone(data_customer.phone);
                setCep(data_customer.cep);
                setSex(data_customer.sex);
                setDate(parseISO(data_customer.date_birth));
            }
        )
    }, [customer_id]);

    const handleSubmit = useCallback(async(data: CustomerData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigat??rio'),
                cpf: Yup.string().required('CPF obrigat??rio').min(14, 'CPF deve possuir 11 digitos'),
                phone: Yup.string().required('Telefone obrigat??rio').min(14, 'Contato deve possuir no m??nimo 10 digitos'),
                email: Yup.string().required('E-mail obrigat??rio').email('Digite um e-mail valido'),
                sex: Yup.string().required('Selecione um sexo para o cliente'),
                address: Yup.string().required('Nome da rua obrigat??rio'),
                address_number: Yup.string().required('N??mero da resid??ncia obrigat??rio'),
                neighborhood: Yup.string().required('Bairro obrigat??rio'),
                cep: Yup.string().required('CEP obrigat??rio').min(9, 'CEP deve possuir 8 digitos'),
                date_birth: Yup.date().max(new Date(), 'Data inv??lida').required('Data de nascimento obrigat??ria')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.put(`/customers/${customer_id}`, data);
            const updated_customer = response.data;
            
            setCustomer(updated_customer);
            setDocument(updated_customer.cpf);
            setPhone(updated_customer.phone);
            setCep(updated_customer.cep);

            addToast({
                type: 'success',
                title: 'Atualiza????o conclu??da',
                description: 'A atualiza????o do cliente foi um sucesso.',
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na atualiza????o',
                description: 'Ocorreu um erro ao atualizar cliente, tente novamente.',
            });
        }
    }, [addToast, customer_id]);

    const handleSelectSex = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const sex = event.target.value;

        setSex(sex);
    }, []);

    return (
        <Container>
            <Header/>
            <Content>
                <Title>
                    <RiSurveyLine size={80}/>
                    <h1>Informa????es atuais | Cliente</h1>
                </Title>
                <Form 
                    ref={formRef}
                    initialData={ customer && {
                        name: customer.name,
                        address: customer.address,
                        address_number: customer.address_number,
                        neighborhood: customer.neighborhood,
                        email: customer.email,
                    }}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <div>
                            <label htmlFor="name">Nome</label>
                            <Input name="name" placeholder="Nome" icon={FiUser}/>
                        </div>
                        <div>
                            <label htmlFor="sex">Sexo</label>
                            <Select 
                                value={sex} 
                                name="sex"
                                onChange={handleSelectSex}
                            >
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </Select>
                        </div>
                    </NameContent>

                    <DocumentContent>
                        <div>
                            <label htmlFor="cpf">CPF</label>
                            <Input 
                                value={document} 
                                onChange={e => setDocument(maskCpf(e.target.value))} 
                                name="cpf" 
                                placeholder="CPF"
                                icon={FiCreditCard}
                            />
                        </div>
                        <div>
                            <label htmlFor="date_birth">Data de nascimento</label>
                            <Datepicker  
                                name="date_birth"
                                selected={date}
                            />
                        </div>
                    </DocumentContent>

                    <h1>Contato</h1>
                    <ContactContent>
                        <div>
                            <label htmlFor="phone">N??mero de contato</label>
                            <Input 
                                value={phone} 
                                onChange={e => setPhone(maskPhone(e.target.value))} 
                                type="tel" 
                                name="phone" 
                                placeholder="Contato"
                                icon={FiPhone}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <Input type="email" name="email" placeholder="E-mail" icon={FiMail} />
                        </div>
                    </ContactContent>
                    
                    <h1>Endere??o</h1>
                    <AddressContent>
                        <div>
                            <label htmlFor="neighborhood">Bairro</label>
                            <Input name="neighborhood" placeholder="Bairro" icon={RiCommunityLine} />

                            <label htmlFor="address">Rua</label>
                            <Input name="address" placeholder="Rua" icon={RiHome4Line} />
                        </div>
                        <div>
                            <label htmlFor="cep">CEP</label>
                            <Input 
                                value={cep} 
                                onChange={e => setCep(maskCep(e.target.value))} 
                                name="cep" 
                                placeholder="CEP" 
                                icon={RiRoadMapLine}
                            />

                            <label htmlFor="address_number">N??mero</label>
                            <Input name="address_number" placeholder="N??mero"/>
                        </div>
                    </AddressContent>
                    
                    <Button type="submit">Atualizar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default CustomersDetails;