import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';
import { 
    RiBarcodeLine,
    RiMoneyDollarBoxLine
} from 'react-icons/ri';
import { FiPackage} from 'react-icons/fi';

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

interface ProductsData {
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
}

const ProductsDetails: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [product, setProduct] = useState<ProductsData>();
    const [price, setPrice] = useState('');
    const [averageCost, setAverageCost] = useState('');

    const params = useParams();
    const { addToast } = useToast();

    const productId = stringify(params).replace('id=', '');

    useEffect(() => {
        api.get<ProductsData>(`/products/details/${productId}`).then(
            response => {
                const data = response.data;
                setProduct(data);
                setPrice(maskMoney(String(data.price)));
                setAverageCost(maskMoney(String(data.average_cost)));
            }
        )
    }, [productId]);

    const handleSubmit = useCallback(async(data: ProductsData) => {
        try {
            formRef.current?.setErrors({});

            data.average_cost = parseFloat(averageCost.replace('.', '').replace(',', '.'));
            data.price = parseFloat(price.replace('.', '').replace(',', '.'));

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigat??rio'),
                code: Yup.string().nullable(),
                description: Yup.string().nullable(),
                price: Yup.number().required('Valor obrigat??rio'),
                average_cost: Yup.number()
                .equals(
                    [product && Number(product.average_cost)], 
                    'Esse valor n??o pode ser alterado'
                ),
                quantity: Yup.number()                    
                .equals(
                    [product && product.quantity], 
                    'Esse valor n??o pode ser alterado'
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const response = await api.put(`/products/${productId}`, data);
            const updatedProduct = response.data;

            setProduct(updatedProduct);

            addToast({
                type: 'success',
                title: 'Atualiza????o conclu??da',
                description: 'A atualiza????o do produto foi um sucesso.',
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
                description: 'Ocorreu um erro ao atualizar produto, tente novamente.',
            });
        }
    }, [addToast, price, averageCost, product, productId]);

    return (
        <Container>
            <Header />
            <Content>
                <Title>
                    <FiPackage size={80}/>
                    <h1>Informa????es atuais | Produto</h1>
                </Title>
                <Form 
                    ref={formRef}
                    initialData={ product && {
                        name: product.name,
                        code: product.code,
                        description: product.description,
                        quantity: product.quantity
                    }}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <label htmlFor="name">Nome</label>
                        <Input name="name" placeholder="Nome" icon={FiPackage}/>

                        <label htmlFor="code">C??digo<span>(Campo opcional)</span></label>
                        <Input name="code" placeholder="C??digo" icon={RiBarcodeLine}/>
                    </NameContent>    
                    <label htmlFor="description">Descri????o<span>(Campo opcional)</span></label>
                    <Textarea name="description" rows={4} placeholder="Descreva seu produto..."/>
                    <h1>Valores | Estoque</h1>
                    <ValueContent>
                        <div>
                            <label htmlFor="price">Pre??o</label>
                            <Input
                                value={price}
                                onChange={e => setPrice(maskMoney(e.target.value))} 
                                name="price"
                                placeholder="Pre??o" icon={RiMoneyDollarBoxLine}/>
                        </div>
                        <div>
                            <label htmlFor="average_cost">Pre??o de custo</label>
                            <Input 
                                value={averageCost}
                                onChange={e => setAverageCost(maskMoney(e.target.value))}
                                name="average_cost" 
                                placeholder="Pre??o de custo" 
                                icon={RiMoneyDollarBoxLine}
                                disabled
                            />
                        </div>
                    </ValueContent>
                    <label htmlFor="quantity">Quantidade</label>
                    <Input name="quantity" placeholder="Quantidade" type="number" disabled />      
                    <Button type="submit">Atualizar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default ProductsDetails;