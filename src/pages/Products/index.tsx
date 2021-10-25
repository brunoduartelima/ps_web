import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    RiSearchLine,
    RiBook2Line, 
    RiBookOpenLine,
    RiFileList3Line,
    RiEdit2Line,
    RiDeleteBin7Line,
    RiArrowRightLine,
    RiAddFill,
    RiSurveyLine
} from 'react-icons/ri';

import api from '../../services/api';
import { usePagination } from '../../hooks/pagination';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import CreateProductModal from './CreateProductsModal';

import {
    Container,
    ProductsContainer,
    ServicesContent,
    SearchContent,
    ProductsContent,
    Product,
    ProductOptions,
    ProductOptionsContent,
    OptionButton,
    DeleteContainer,
    DeleteContent,
    ProductData
} from './styles';

import { useToast } from '../../hooks/toast';

interface ProductsData {
    id: string;
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductsData[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [paginationFlag, setPaginationFlag] = useState('');
    const [selectedShowProduct, setSelectedShowProduct] = useState<String[]>([]);
    const [modalRegistration, setModalRegistration] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const { currentPage, updateCurrentPage } = usePagination();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        api.get('/products').then(response => {
            setProducts(response.data);
        })
    }, []);

    useEffect(() => {
        try {
            if(paginationFlag === 'ListAll') {
                api.get(`/products/search/list-all?page=${currentPage}`).then(
                    response => {
                        setProducts(response.data[0]);
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/products/search/list-all?page=${currentPage}`);
            }
            if(paginationFlag === 'Search' && searchName.length) {
                api.get(`/products/search?name=${searchName}&page=${currentPage}`).then(
                    response => {
                        setProducts(response.data[0]);
                        setTotalElements(Number(response.data[1]));
                    }
                )
    
                history.push(`/products/search?name=${searchName}&page=${currentPage}`);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar produtos, tente novamente.',
            });
        }
    }, [currentPage, totalElements, history, paginationFlag, searchName, addToast]);

    const handleListAllProducts = useCallback(async () => {
        try {
            const response = await api.get(`/products/search/list-all?page=1`);
            history.push(`/products/search/list-all?page=1`);
            setProducts(response.data[0]);
            setTotalElements(Number(response.data[1]));
            setPaginationFlag('ListAll');
            updateCurrentPage(1);
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar produtos, tente novamente.',
            });
        }
    }, [history, updateCurrentPage, addToast]);

    const handleShowDataProduct = useCallback((id: string) => {
        const alreadySelected = selectedShowProduct.findIndex(product => product === id);

        if (alreadySelected > -1) {
            const filteredProduct = selectedShowProduct.filter(product => product !== id);
            
            setSelectedShowProduct(filteredProduct);

        } else {
            setSelectedShowProduct([...selectedShowProduct, id]);
        }
    }, [selectedShowProduct]);

    const handleSearchProduct = useCallback(async (event: KeyboardEvent<HTMLInputElement> ) => {
        try {
            const key = event.key;
            if(key === 'Enter' && searchName.length) {
                const response = await api.get(`/products/search?name=${searchName}&page=1`);
                history.push(`/products/search?name=${searchName}&page=1`);
                setProducts(response.data[0]);
                setTotalElements(Number(response.data[1]));
                setPaginationFlag('Search');
                updateCurrentPage(1);
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar produtos, tente novamente.',
            });
        }
    }, [history, searchName, updateCurrentPage, addToast]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await api.delete(`/products/${id}`);

            setProducts(oldProducts => oldProducts.filter(product => product.id !== id));

            addToast({
                type: 'success',
                title: 'Produto excluido',
                description: 'O produto foi excluido com sucesso.',
            });
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao excluir',
                description: 'Ocorreu um erro ao excluir produto, tente novamente.',
            });
        } finally {
            setDeleteConfirmation(false);
        }
    }, [addToast]);

    return(
        <Container>
            <Header/>
            <ProductsContainer>
                <ServicesContent>
                    <form onSubmit={e => e.preventDefault()}>
                        <SearchContent>
                            <div><RiSearchLine size={22} /></div>
                            <input type="text" name="name" placeholder="Procurar" onKeyPress={handleSearchProduct} onChange={e => setSearchName(e.target.value)}/>
                        </SearchContent>
                    </form>
                    <div>
                        <button type="button" onClick={() => handleListAllProducts()}>
                            <RiFileList3Line size={22} />
                            Listar todos
                        </button>
                        <button type="button" onClick={() => setModalRegistration(true)}>
                            <RiAddFill size={22} />
                            Cadastrar
                        </button>
                        <Link to="/stocks">
                            <RiSurveyLine size={22} />
                            Estoque
                        </Link>
                    </div>
                </ServicesContent>
                <ProductsContent>
                    { paginationFlag.length ? <h1>Resultados encontrados: { totalElements }</h1> : <h1>Cadastrados recentemente</h1> }
                    <ul>
                        { products.length ? products.map(product => (
                            <Product key={product.id}>
                                <ProductOptions>
                                    <span>{product.name}</span>
                                    <ProductOptionsContent>
                                        <OptionButton type="button" onClick={() => handleShowDataProduct(product.id)}>
                                            <div>
                                                {selectedShowProduct.includes(product.id) ?
                                                <RiBookOpenLine size={22} title="Fechar" /> : 
                                                <RiBook2Line size={22} title="Mostrar" /> }
                                            </div>    
                                        </OptionButton>
                                        <OptionButton type="button">
                                            <RiEdit2Line size={24} title="Editar" />
                                        </OptionButton>
                                        <OptionButton type="button" onClick={() => setDeleteConfirmation(true)}>
                                            <RiDeleteBin7Line size={22} title="Excluir" />
                                        </OptionButton>
                                        { deleteConfirmation  && 
                                            <DeleteContainer>
                                                <DeleteContent>
                                                    <strong>Deseja realmente excluir esse produto ?</strong>
                                                    <div>
                                                        <button type="button" onClick={() => handleDelete(product.id)}>Confirmar</button>
                                                        <button type="button" onClick={() => setDeleteConfirmation(false)}>Cancelar</button>
                                                    </div>
                                                </DeleteContent>
                                            </DeleteContainer>
                                        }
                                    </ProductOptionsContent>
                                </ProductOptions>
                                <ProductData isOpen={!selectedShowProduct.includes(product.id)} >
                                    <ul>
                                        <li><span>Codígo: </span>{product.code}</li>
                                        <li><span>Descrição: </span>{product.description}</li>
                                        <li><span>Preço: </span>R$ {product.price}</li>
                                        <li><span>Quantidade: </span>{product.quantity}</li>
                                        <li><span>Custo médio: </span>R$ {product.average_cost}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/product/${product.id}`}>Ver histórico completo<RiArrowRightLine size={24}/></Link>
                                    </div>
                                </ProductData>
                            </Product>
                        )) : <span>Nenhum resultado encontrado</span> }
                    </ul>
                </ProductsContent>
                { totalElements > 0 && <Pagination totalElements={totalElements}  /> }
            </ProductsContainer>
            { modalRegistration && <CreateProductModal onClose={() => setModalRegistration(false)} /> }
        </Container>
    )
}

export default Products;