import React, { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react';
import { FiPackage } from 'react-icons/fi';
import { RiStore3Line } from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import axios from 'axios';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { 
    Container,
    SimpleContent, 
    FormContent,  
    StyledContent 
} from './styles';

import imgStore from '../../assets/store.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import getValidationErrors from '../../utils/getValidationErrors';

interface Uf {
    sigla: string;
}

interface City {
    nome: string;
}

interface CompanyFormData {
    name: string;
    company_type: string;
    uf: string;
    city: string;
}

const CompanyRegister: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    
    const location = useLocation();
    const history = useHistory();

    const { addToast } = useToast();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>();
    const [selectedCity, setSelectedCity] = useState<string>();

    useEffect(() => {
        axios.get<Uf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if(selectedUf === '0')
            return;

        axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
            const cityNames = response.data.map(city => city.nome);
    
            setCities(cityNames);
        });
        
    }, [selectedUf]);

    const handleSelectUf = useCallback((event: ChangeEvent<HTMLSelectElement>) => { 
        const uf = event.target.value;

        setSelectedUf(uf);
        setSelectedCity('0');
    }, []);

    const handleSelectCity = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;

        setSelectedCity(city);
    }, []);

    const handleSubmit = useCallback(async (data: CompanyFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                company_type: Yup.string().required('Tipo obrigatório'),
                uf: Yup.string().min(2, 'Escolha um estado'),
                city: Yup.string().min(2, 'Escolha uma cidade'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const user_id = location.pathname.replace('/company-register/', '');

            await api.post(`/companies/${user_id}`, data);

            history.push('/sign-in');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }
            
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar empresa',
                description: 'Ocorreu um erro ao tentar cadastrar empresa, revise as informações e tente novamente.',
            });
            
        }
    }, [addToast, location, history]);

    return (
        <Container>
            <SimpleContent>
                <img src={imgStore} alt="Loja" />
            </SimpleContent>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <FormContent>
                    <legend>Cadastro | Dados da Empresa</legend>
                    
                    <label htmlFor="name">Nome da sua empresa</label>
                    <Input name="name" icon={RiStore3Line} placeholder="Loja do João" />

                    <label htmlFor="company_type">Tipo de produto/serviço</label>
                    <Input name="company_type" icon={FiPackage} placeholder="Roupas e calçados" />

                    <label htmlFor="uf">Estado</label>
                    <Select 
                        name="uf" 
                        value={selectedUf} 
                        onChange={handleSelectUf}
                    >
                        <option value="0">Selecione uma UF</option>
                        {ufs.map(uf => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </Select>
                    <label htmlFor="city">Cidade</label>
                    <Select 
                        name="city" 
                        value={selectedCity} 
                        onChange={handleSelectCity} 
                    >
                        <option value="0">Selecione uma cidade</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </Select>
                    <Button type="submit" >Cadastrar</Button>
                </FormContent>
            </Form>
            <StyledContent>
                <div>
                    <p>Falta pouco!</p>
                    <p>Precisamos só de mais alguns dados para você aproveitar ao máximo nosso sistema</p>
                </div>
            </StyledContent>
        </Container>
    )
}

export default CompanyRegister;