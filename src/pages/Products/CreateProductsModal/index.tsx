import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { 
    RiCloseFill, 
    RiBarcodeLine,
    RiMoneyDollarBoxLine
} from 'react-icons/ri';
import { FiPackage} from 'react-icons/fi';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    DocumentContent
} from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Textarea from '../../../components/Textarea';
import getValidationErrors from '../../../utils/getValidationErrors';
import { maskMoney } from '../../../utils/inputMasks';

interface ProductsData {
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
}

interface CreateProductModaProps {
    onClose(): void;
}

const CreateProductModal: React.FC<CreateProductModaProps> = ({ onClose }) => {
    const formRef = useRef<FormHandles>(null);
    const [price, setPrice] = useState('');
    const [averageCost, setAverageCost] = useState('');

    const { addToast } = useToast();

    const handleSubmit = useCallback(async(data: ProductsData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                code: Yup.string().nullable(),
                description: Yup.string().nullable(),
                price: Yup.string().required('Valor obrigatório'),
                average_cost: Yup.string().required('Valor de custo obrigatório'),
                quantity: Yup.number().required('Quantidade obrigatória').min(0, 'O valor deve ser maior ou igual a zero'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            data.average_cost = parseFloat(averageCost.replace('.', '').replace(',', '.'));
            data.price = parseFloat(price.replace('.', '').replace(',', '.'));

            await api.post('/products', data);

            onClose();

            addToast({
                type: 'success',
                title: 'Cadastro concluído',
                description: 'O cadastro do produto foi um sucesso.',
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
                description: 'Ocorreu um erro ao cadastrar produto, tente novamente.',
            });
        }
    }, [addToast, onClose, price, averageCost]);

    return (
        <Container>
            <Content>
                <button type="button" onClick={onClose}><RiCloseFill size={28} title="Fechar" /></button>
                <Title>
                    <FiPackage size={80}/>
                    <h1>Cadastrar | Produto</h1>
                </Title>
                <Form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <label htmlFor="name">Nome</label>
                        <Input name="name" placeholder="Nome" icon={FiPackage}/>

                        <label htmlFor="code">Código<span>(Campo opcional)</span></label>
                        <Input name="code" placeholder="Código" icon={RiBarcodeLine}/>
                    </NameContent>    
                    <label htmlFor="description">Descrição<span>(Campo opcional)</span></label>
                    <Textarea name="description" rows={4} placeholder="Descreva seu produto..."/>
                    <h1>Valores | Estoque</h1>
                    <DocumentContent>
                        <div>
                            <label htmlFor="price">Preço</label>
                            <Input
                                value={price}
                                onChange={e => setPrice(maskMoney(e.target.value))} 
                                name="price"
                                placeholder="Preço" icon={RiMoneyDollarBoxLine}/>
                        </div>
                        <div>
                            <label htmlFor="average_cost">Preço de custo</label>
                            <Input 
                                value={averageCost}
                                onChange={e => setAverageCost(maskMoney(e.target.value))}
                                name="average_cost" 
                                placeholder="Preço de custo" 
                                icon={RiMoneyDollarBoxLine}
                            />
                        </div>
                    </DocumentContent>
                    <label htmlFor="quantity">Quantidade</label>
                    <Input name="quantity" placeholder="Quantidade" type="number" />           
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default CreateProductModal;