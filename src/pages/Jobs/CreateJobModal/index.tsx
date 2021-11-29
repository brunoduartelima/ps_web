import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { 
    RiCloseFill,
    RiMoneyDollarBoxLine,
    RiHandCoinLine
} from 'react-icons/ri';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    ValueContent
} from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Textarea from '../../../components/Textarea';
import getValidationErrors from '../../../utils/getValidationErrors';
import { maskMoney } from '../../../utils/inputMasks';

interface JobsData {
    name: string;
    description?: string;
    price: number;
    average_time: string;
}

interface CreateJobModaProps {
    onClose(): void;
}

const CreateJobModal: React.FC<CreateJobModaProps> = ({ onClose }) => {
    const formRef = useRef<FormHandles>(null);
    const [price, setPrice] = useState('');

    const { addToast } = useToast();

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

            await api.post('/jobs', data);

            onClose();

            addToast({
                type: 'success',
                title: 'Cadastro concluído',
                description: 'O cadastro do serviço foi um sucesso.',
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
                description: 'Ocorreu um erro ao cadastrar serviço, tente novamente.',
            });
        }
    }, [addToast, onClose, price]);

    return (
        <Container>
            <Content>
                <button type="button" onClick={onClose}><RiCloseFill size={28} title="Fechar" /></button>
                <Title>
                    <RiHandCoinLine size={80}/>
                    <h1>Cadastrar | Serviço</h1>
                </Title>
                <Form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <label htmlFor="name">Nome</label>
                        <Input name="name" placeholder="Nome" icon={RiHandCoinLine}/>
                    </NameContent>    
                    <label htmlFor="description">Descrição<span>(Campo opcional)</span></label>
                    <Textarea name="description" rows={4} placeholder="Descreva seu serviço..."/>
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
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default CreateJobModal;