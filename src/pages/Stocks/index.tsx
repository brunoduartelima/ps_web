import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {
    RiDeleteBin7Line,
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
    Datalist,
    DatalistOptions,
    ProductOption,
    ProductsSelected,
    ProductsSelectedContent,
    OperationContent,
    ValueContent
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Datepicker from '../../components/Datepicker';

interface StockData {
    type: 'Entrada' | 'Saída';
    supplier?: string;
    description?: string;
    date: Date;
    value: number;
    quantity: number;
    product_id: string;
}

interface ProductsData {
    id: string;
    name: string;
    code?: string;
    average_cost: string;
    quantity: number;
}

const Stocks: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [value, setValue] = useState('');
    const [searchName, setSearchName] = useState('');
    const [products, setProducts] = useState<ProductsData[]>([]);
    const [productsSelected, setProductsSelected] = useState<ProductsData[]>([]);

    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        try {
            if(searchName.length){
                api.get(`/products/search?name=${searchName}&page=1`).then(
                    response => {
                        setProducts(response.data[0]);
                    }
                )
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar produtos, tente novamente.',
            });
        }
    }, [searchName, addToast]);

    const handleSubmit = useCallback(async(data: StockData) => {
        try {
            formRef.current?.setErrors({});

            data.value = parseFloat(value.replace('.', '').replace(',', '.'));
            data.product_id = productsSelected[0] ? productsSelected[0].id : '';

            const schema = Yup.object().shape({
                type: Yup.string().required('Tipo de operação obrigatório'),
                date: Yup.string().required('Data da operação obrigatória').nullable(),
                supplier: Yup.string().nullable(),
                description: Yup.string().nullable(),
                product_id: Yup.string().required('Escolha um produto'),
                value: Yup.number().required('Valor obrigatório'),
                quantity: Yup.number().required('Quantidade obrigatória').min(0, 'O valor deve ser maior ou igual a zero'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/stocks', data);

            addToast({
                type: 'success',
                title: 'Cadastro concluído',
                description: 'O cadastro da operação de estoque foi um sucesso.',
            });

            history.push('/products');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                console.log(errors)

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao cadastrar produto, tente novamente.',
            });
        }
    }, [addToast, value, productsSelected, history]);

    const handleProduct = useCallback((product: ProductsData) => {
        if(productsSelected.length === 0) {
            setProductsSelected([...productsSelected, product]);
            setSearchName('');
        }

        setSearchName('');
    }, [productsSelected]);

    const handleRemoveProductList = useCallback((id: string) => {
        setProductsSelected(oldProducts => oldProducts.filter(product => product.id !== id));
    }, []);

    return (
        <Container>
            <Header/>
            <Content>
                <Title>
                    <FiPackage size={80}/>
                    <h1>Cadastrar | Operação de Estoque</h1>
                </Title>
                <Form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                > 
                    <OperationContent>
                        <div>
                            <label htmlFor="type">Tipo de operação</label>
                            <Select name="type" placeholder="Nome">
                                <option value="Entrada">Entrada</option>
                                <option value="Saída">Saída</option>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="date">Data da operação</label>
                            <Datepicker name="date" />
                        </div>
                    </OperationContent>
                    
                    <label htmlFor="supplier">Fornecedor</label>
                    <Input type="text" name="supplier" placeholder="Nome/Razão Social" />    
                    
                    <label htmlFor="description">Descrição<span>(Campo opcional)</span></label>
                    <Textarea name="description" rows={4} placeholder="Detalhe sua operação..."/>
                    
                    <h1>Produtos</h1>
                    <Datalist>
                        <Input 
                            name="product_id"
                            placeholder="Digite o nome para buscar o produto"
                            list="product" 
                            type="text"
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                        />
                        <DatalistOptions>
                            { searchName.length ? products.map(product => (
                                <ProductOption id="product" key={product.id} onClick={() => handleProduct(product)}>
                                    <div>
                                        <strong>{product.name}</strong>
                                        {product.code && <p>{product.code}</p>}
                                    </div>
                                    <div>
                                        <p>Custo Médio: R$ {maskMoney(product.average_cost)}</p>
                                        <p>Quant: {product.quantity}</p>
                                    </div>
                                </ProductOption>
                            )) : ''}
                        </DatalistOptions>
                    </Datalist>
                    { productsSelected.length > 0 && 
                        <>
                            <h2>Selecionados</h2>
                            <ProductsSelected>
                                { productsSelected.map(product => (
                                    <ProductsSelectedContent key={product.id}>
                                        <div>
                                            <strong>{product.name}</strong>
                                            {product.code && <p>{product.code}</p>}
                                            <p>Custo Médio: R$ {maskMoney(product.average_cost)}</p>
                                            <p>Quant: {product.quantity}</p>
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => handleRemoveProductList(product.id)}><RiDeleteBin7Line size={22} title="Excluir" /></button>
                                        </div>
                                    </ProductsSelectedContent>
                                ))}
                            </ProductsSelected>
                        </>
                    }
                    <ValueContent>
                        <div>
                            <label htmlFor="value">Valor total</label>
                            <Input
                                value={value}
                                onChange={e => setValue(maskMoney(e.target.value))} 
                                name="value"
                                placeholder="Valor total dos produtos" icon={RiMoneyDollarBoxLine}
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantidade</label>
                            <Input name="quantity" placeholder="Quantidade" type="number" /> 
                        </div>
                    </ValueContent>
      
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Stocks;