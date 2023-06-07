import React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { RiCommunityLine, RiHome4Line, RiRoadMapLine, RiSurveyLine } from 'react-icons/ri';
import { FiCreditCard, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { maskCpf, maskPhone, maskCep } from '../../utils/inputMasks';

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
    addressNumber: string;
    neighborhood: string;
    cep: string;
    dateBirth: string | Date;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    cpf: Yup.string().required('CPF obrigatório').min(14, 'CPF deve possuir 11 digitos'),
    phone: Yup.string().required('Telefone obrigatório').min(14, 'Contato deve possuir no mínimo 10 digitos'),
    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
    sex: Yup.string().required('Selecione um sexo para o cliente'),
    address: Yup.string().required('Nome da rua obrigatório'),
    addressNumber: Yup.string().required('Número da residência obrigatório'),
    neighborhood: Yup.string().required('Bairro obrigatório'),
    cep: Yup.string().required('CEP obrigatório').min(9, 'CEP deve possuir 8 digitos'),
    dateBirth: Yup.date().max(new Date(), 'Data inválida').required('Data de nascimento obrigatória')
});

const CustomersDetails = () => {
    const { id: idCustomer } = useParams<{id: string}>();
    const { addToast } = useToast();

    const create = useForm<CustomerData>({
        resolver: yupResolver(schema),
        defaultValues: async () => {
            const { data } = await api.get<CustomerData>(`/customers/details/${idCustomer}`)
            return data;
        }
    });

    const {  
        handleSubmit
    } = create;

    const updateCustomer = async (data: CustomerData) => {
        try {
            const response = await api.put(`/customers/${idCustomer}`, data);
            
            addToast({
                type: 'success',
                title: 'Atualização concluída',
                description: 'A atualização do cliente foi um sucesso.',
            });

        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao atualizar cliente, tente novamente.',
            });
        }
    };

    return (
        <Container>
            <Header/>
            <Content>
                <Title>
                    <RiSurveyLine size={80}/>
                    <h1>Informações atuais | Cliente</h1>
                </Title>
                <FormProvider {...create}>
                    <form 
                        onSubmit={handleSubmit(updateCustomer)}
                    > 
                        <NameContent>
                            <div>
                                <label htmlFor="name">Nome</label>
                                <Input name="name" placeholder="Nome" icon={FiUser}/>
                            </div>
                            <div>
                                <label htmlFor="sex">Sexo</label>
                            </div>
                        </NameContent>

                        <DocumentContent>
                            <div>
                                <label htmlFor="cpf">CPF</label>
                                <Input
                                    name="cpf" 
                                    placeholder="CPF"
                                    icon={FiCreditCard}
                                />
                            </div>
                            <div>
                                <label htmlFor="dateBirth">Data de nascimento</label>
                                <Datepicker  
                                    name="dateBirth"
                                />
                            </div>
                        </DocumentContent>

                        <h1>Contato</h1>
                        <ContactContent>
                            <div>
                                <label htmlFor="phone">Número de contato</label>
                                <Input 
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
                        
                        <h1>Endereço</h1>
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
                                    name="cep" 
                                    placeholder="CEP" 
                                    icon={RiRoadMapLine}
                                />

                                <label htmlFor="addressNumber">Número</label>
                                <Input name="addressNumber" placeholder="Número"/>
                            </div>
                        </AddressContent>
                        
                        <Button type="submit">Atualizar</Button>
                    </form>
                </FormProvider>
            </Content>
        </Container>
    )
}

export default CustomersDetails;