import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import {
    RiHandCoinLine,
    RiMoneyDollarBoxLine
} from 'react-icons/ri';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { maskMoney } from '../../utils/inputMasks';
import getValidationErrors from '../../utils/getValidationErrors';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    ValueContent
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Header from '../../components/Header';

interface JobsData {
    id: string;
    name: string;
    description?: string;
    price: number;
    average_time: string;
}

const JobsDetails: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [job, setJob] = useState<JobsData>();
    const [price, setPrice] = useState('');

    const { id: idJob } = useParams<{id: string}>();
    const { addToast } = useToast();

    useEffect(() => {
        api.get<JobsData>(`/jobs/details/${idJob}`).then(
            response => {
                const data = response.data;
                setJob(data);
                setPrice(maskMoney(String(data.price)));
            }
        )
    }, [idJob]);

    const handleSubmit = useCallback(async(data: JobsData) => {
        try {
            formRef.current?.setErrors({});

            data.price = parseFloat(price.replace('.', '').replace(',', '.'));

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                description: Yup.string().nullable(),
                price: Yup.number().required('Valor obrigatório'),
                average_time: Yup.string().required('Tempo médio obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.put(`/jobs/${idJob}`, data);
            const updatedJob = response.data;

            setJob(updatedJob);

            addToast({
                type: 'success',
                title: 'Atualização concluída',
                description: 'A atualização do serviço foi um sucesso.',
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
                description: 'Ocorreu um erro ao atualizar serviço, tente novamente.',
            });
        }
    }, [addToast, price, idJob]);

    return (
        <Container>
            <Header />
            <Content>
                <Title>
                    <RiHandCoinLine size={80}/>
                    <h1>Informações atuais | Serviço</h1>
                </Title>
                <Form 
                    ref={formRef}
                    initialData={ job && {
                        name: job.name,
                        description: job.description,
                        average_time: job.average_time
                    }}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <label htmlFor="name">Nome</label>
                        <Input name="name" placeholder="Nome" icon={RiHandCoinLine}/>
                    </NameContent>    
                    <label htmlFor="description">Descrição<span>(Campo opcional)</span></label>
                    <Textarea name="description" rows={4} placeholder="Descreva seu produto..."/>
                    <h1>Valores</h1>
                    <ValueContent>
                        <div>
                            <label htmlFor="price">Preço</label>
                            <Input
                                value={price}
                                onChange={e => setPrice(maskMoney(e.target.value))} 
                                name="price"
                                placeholder="Preço" icon={RiMoneyDollarBoxLine}/>
                        </div>
                        <div>
                            <label htmlFor="average_time">Tempo médio de execução</label>
                            <Input name="average_time" type="text"  placeholder="00:00"/>
                        </div>
                    </ValueContent>     
                    <Button type="submit">Atualizar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default JobsDetails;