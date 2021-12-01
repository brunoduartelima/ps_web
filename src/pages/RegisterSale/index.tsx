import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {
    RiDeleteBin7Line
} from 'react-icons/ri';
import { FiMinusCircle, FiPlusCircle, FiShoppingCart } from 'react-icons/fi';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import formatValue, { maskCpf, maskMoney } from '../../utils/inputMasks';
import getValidationErrors from '../../utils/getValidationErrors';

import { 
    Container, 
    Content, 
    Title,
    NameContent,
    Datalist,
    DatalistOptions,
    Option,
    Selecteds,
    SelectedsContent,
    ButtonRemove,
    Amount,
    ValueContent
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Datepicker from '../../components/Datepicker';
import { useHistory } from 'react-router';

interface IProduct {
    id: string;
    price: number;
    descont?: number;
    quantity: number;
}

interface IJob {
    id: string;
    price: number;
    descont?: number;
    quantity: number;
}

interface IEmployee {
    id: string;
    commission?: number;
}

interface SalesData {
    type: string;
    description?: string;
    date: Date;
    customer_id?: string;
    employees: IEmployee[];
    products?: IProduct[];
    jobs?: IJob[];
}

interface CustomersData {
    id: string;
    name: string;
    cpf: string;
}

interface ProductsData {
    id: string;
    name: string;
    code?: string;
    price: string;
    average_cost: string;
    quantity: number;
}

interface SaleProductsData {
    id: string;
    name: string;
    quantity: number;
    descont: string;
    price: string;
    subtotal: number | string;
}

interface JobsData {
    id: string;
    name: string;
    price: string;
}

interface SaleJobsData {
    id: string;
    name: string;
    quantity: number;
    descont: string;
    price: string;
    subtotal: number | string;
}

interface EmployeesData {
    id: string;
    name: string;
}

interface SaleEmployeesData {
    id: string;
    name: string;
    commission: string;
}

const RegisterSale: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [total, setTotal] = useState('');
    const [searchCustomer, setSearchCustomer] = useState('');
    const [searchProduct, setSearchProduct] = useState('');
    const [searchJob, setSearchJob] = useState('');
    const [searchEmployee, setSearchEmployee] = useState('');
    const [customers, setCustomers] = useState<CustomersData[]>([]);
    const [customerSelected, setCustomerSelected] = useState<CustomersData | null>(null);
    const [products, setProducts] = useState<ProductsData[]>([]);
    const [productsSelected, setProductsSelected] = useState<SaleProductsData[]>([]);
    const [jobs, setJobs] = useState<JobsData[]>([]);
    const [jobsSelected, setJobsSelected] = useState<SaleJobsData[]>([]);
    const [employees, setEmployees] = useState<EmployeesData[]>([]);
    const [employeesSelected, setEmployeesSelected] = useState<SaleEmployeesData[]>([]);

    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        try {
            if(searchCustomer.length){
                api.get(`/customers/search?name=${searchCustomer}&page=1`).then(
                    response => {
                        setCustomers(response.data[0]);
                    }
                )
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar clientes, tente novamente.',
            });
        }
    }, [searchCustomer, addToast]);

    useEffect(() => {
        try {
            if(searchProduct.length){
                api.get(`/products/search?name=${searchProduct}&page=1`).then(
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
    }, [searchProduct, addToast]);

    useEffect(() => {
        try {
            if(searchJob.length){
                api.get(`/jobs/search?name=${searchJob}&page=1`).then(
                    response => {
                        setJobs(response.data[0]);
                    }
                )
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar serviços, tente novamente.',
            });
        }
    }, [searchJob, addToast]);

    useEffect(() => {
        try {
            if(searchEmployee.length){
                api.get(`/employees/search?name=${searchEmployee}&page=1`).then(
                    response => {
                        setEmployees(response.data[0]);
                    }
                )
            }
        } catch {
            addToast({
                type: 'error',
                title: 'Erro ao listar',
                description: 'Ocorreu um erro ao listar colaboradores, tente novamente.',
            });
        }
    }, [searchEmployee, addToast]);

    useEffect(() => {
        let productsTotal = 0;
        let jobsTotal = 0;
        if(productsSelected.length) {
            productsTotal = productsSelected.reduce((sumTotal, product) => {
                const formatDescont = product.descont.length ? parseFloat(product.descont.replace('.', '').replace(',', '.')) : Number(product.descont);
                sumTotal += (Number(product.price) * product.quantity) - formatDescont;

                return sumTotal;
            }, 0)
        }

        if(jobsSelected.length) {
            jobsTotal = jobsSelected.reduce((sumTotal, job) => {
                const formatDescont = job.descont.length ? parseFloat(job.descont.replace('.', '').replace(',', '.')) : Number(job.descont);
                sumTotal += (Number(job.price) * job.quantity) - formatDescont;

                return sumTotal;
            }, 0)
        }

        setTotal(formatValue(productsTotal + jobsTotal));
    }, [productsSelected, jobsSelected]);

    const handleSubmit = useCallback(async(data: SalesData) => {
        try {
            formRef.current?.setErrors({});

            data.customer_id = customerSelected ? customerSelected.id : undefined;
            data.employees = employeesSelected.map(employee => {
                return {
                    id: employee.id,
                    commission: Number(employee.commission.replaceAll('.', '').replace(',', '.'))
                }
            });
            data.products = productsSelected.map(product => {
                return {
                    id: product.id,
                    price: Number(product.price),
                    descont: Number(product.descont.replaceAll('.', '').replace(',', '.')),
                    quantity: product.quantity
                }
            });
            data.jobs = jobsSelected.map(job => {
                return {
                    id: job.id,
                    price: Number(job.price),
                    descont: Number(job.descont.replaceAll('.', '').replace(',', '.')),
                    quantity: job.quantity 
                }
            });
            
            const schema = Yup.object().shape({
                type: Yup.string().required('Tipo de pagamento obrigatório'),
                date: Yup.string().required('Data da operação obrigatória').nullable(),
                description: Yup.string().nullable(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/sales', data);

            history.push('/sales');

            addToast({
                type: 'success',
                title: 'Operação concluída',
                description: 'A operação de venda foi um sucesso.',
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
    }, [addToast, customerSelected, employeesSelected, productsSelected, jobsSelected]);

    const handleAddCustomerList = useCallback((customer: CustomersData) => {
        setCustomerSelected(customer);
        setSearchCustomer('');
    }, []);

    const handleAddProductList = useCallback((product: ProductsData) => {
        const saleProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            descont: '',
            subtotal: formatValue(Number(product.price))
        }

        setProductsSelected([...productsSelected, saleProduct]);
        setSearchProduct('');
    }, [productsSelected]);

    const handleRemoveProductList = useCallback((id: string) => {
        setProductsSelected(oldProducts => oldProducts.filter(product => product.id !== id));
    }, []);

    function handleProductIncrement(product: SaleProductsData) {
        const formatDescont = product.descont.length ? parseFloat(product.descont.replace('.', '').replace(',', '.')) : Number(product.descont);
        const subtotal = (Number(product.price) * (product.quantity + 1)) - formatDescont;

        const updatedProducts = productsSelected.map(p => p.id === product.id ? {
            ...p,
            subtotal: formatValue(subtotal),
            quantity: product.quantity + 1
        } : p)

        setProductsSelected(updatedProducts);
    }
    
    function handleProductDecrement(product: SaleProductsData) {
        const formatDescont = product.descont.length ? parseFloat(product.descont.replace('.', '').replace(',', '.')) : Number(product.descont);
        const subtotal = (Number(product.price) * (product.quantity - 1)) - formatDescont;

        const updatedProducts = productsSelected.map(p => p.id === product.id ? {
            ...p,
            quantity: product.quantity - 1,
            subtotal: formatValue(subtotal),
        } : p)

        setProductsSelected(updatedProducts);
    }

    function handleProductDescont(product: SaleProductsData, value: string) {
        const descontValue = maskMoney(value);
        const formatDescont = descontValue.length > 1 ? parseFloat(descontValue.replace('.', '').replace(',', '.')) : Number(descontValue);
        const subtotal = (Number(product.price) * product.quantity) - formatDescont;

        const updatedProducts = productsSelected.map(p => p.id === product.id ? {
            ...p,
            descont: descontValue,
            subtotal: formatValue(subtotal),
        } : p)

        setProductsSelected(updatedProducts);
    }

    const handleAddJobList = useCallback((job: JobsData) => {
        const saleJob = {
            id: job.id,
            name: job.name,
            price: job.price,
            quantity: 1,
            descont: '',
            subtotal: formatValue(Number(job.price))
        }

        setJobsSelected([...jobsSelected, saleJob]);
        setSearchJob('');
    }, [jobsSelected]);

    const handleRemoveJobList = useCallback((id: string) => {
        setJobsSelected(oldJobs => oldJobs.filter(job => job.id !== id));
    }, []);

    function handleJobIncrement(job: SaleJobsData) {
        const formatDescont = job.descont.length ? parseFloat(job.descont.replace('.', '').replace(',', '.')) : Number(job.descont);
        const subtotal = (Number(job.price) * (job.quantity + 1)) - formatDescont;

        const updatedJobs = jobsSelected.map(j => j.id === job.id ? {
            ...j,
            subtotal: formatValue(subtotal),
            quantity: job.quantity + 1
        } : j)

        setJobsSelected(updatedJobs);
    }
    
    function handleJobDecrement(job: SaleJobsData) {
        const formatDescont = job.descont.length ? parseFloat(job.descont.replace('.', '').replace(',', '.')) : Number(job.descont);
        const subtotal = (Number(job.price) * (job.quantity - 1)) - formatDescont;

        const updatedJobs = jobsSelected.map(j => j.id === job.id ? {
            ...j,
            quantity: job.quantity - 1,
            subtotal: formatValue(subtotal),
        } : j)

        setJobsSelected(updatedJobs);
    }

    function handleJobDescont(job: SaleJobsData, value: string) {
        const descontValue = maskMoney(value);
        const formatDescont = descontValue.length > 1 ? parseFloat(descontValue.replace('.', '').replace(',', '.')) : Number(descontValue);
        const subtotal = (Number(job.price) * job.quantity) - formatDescont;

        const updatedJobs = jobsSelected.map(j => j.id === job.id ? {
            ...j,
            descont: descontValue,
            subtotal: formatValue(subtotal),
        } : j)

        setJobsSelected(updatedJobs);
    }

    const handleAddEmployeeList = useCallback((employee: EmployeesData) => {
        const saleEmployee = {
            id: employee.id,
            name: employee.name,
            commission: ''
        }

        setEmployeesSelected([...employeesSelected, saleEmployee]);
        setSearchEmployee('');
    }, [employeesSelected]);

    const handleRemoveEmployeeList = useCallback((id: string) => {
        setEmployeesSelected(oldEmployees => oldEmployees.filter(employee => employee.id !== id));
    }, []);

    function handleEmployeeCommission(employee: SaleEmployeesData, value: string) {
        const commissionValue = maskMoney(value);

        const updatedEmployees = employeesSelected.map(e => e.id === employee.id ? {
            ...e,
            commission: commissionValue,
        } : e)

        setEmployeesSelected(updatedEmployees);
    }

    return (
        <Container>
            <Header/>
            <Content>
                <Title>
                    <FiShoppingCart size={80}/>
                    <h1>Cadastrar | Venda</h1>
                </Title>
                <Form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                > 
                    <NameContent>
                        <div>
                            <label htmlFor="type">Tipo de pagamento</label>
                            <Select name="type">
                                <option value="À vista">À vista</option>
                                <option value="A prazo">A prazo</option>
                                <option value="Cartão de crédito">Cartão de crédito</option>
                                <option value="Cartão de débito">Cartão de débito</option>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="date">Data da venda</label>
                            <Datepicker name="date" />
                        </div>
                    </NameContent>    
                    <label htmlFor="description">Descrição<span>(Campo opcional)</span></label>
                    <Textarea name="description" rows={4} placeholder="Descreva detalhes da venda..."/>
                    
                    <h1>Cliente</h1>

                    <Datalist>
                        <Input 
                            name="customer_id"
                            placeholder="Digite o nome para buscar o cliente"
                            list="client" 
                            type="text"
                            value={searchCustomer}
                            onChange={e => setSearchCustomer(e.target.value)}
                        />
                        { searchCustomer.length > 0 &&
                            <DatalistOptions>
                                { customers.map(customer => (
                                    <Option id="client" key={customer.id} onClick={() => handleAddCustomerList(customer)}>
                                        <div>
                                            <strong>{customer.name}</strong>
                                        </div>
                                        <div>
                                            <p>CPF: {maskCpf(customer.cpf)}</p>
                                        </div>
                                    </Option>
                                ))}
                            </DatalistOptions>
                        }
                    </Datalist>
                    { customerSelected && 
                        <>
                            <h2>Selecionado</h2>
                            <Selecteds>
                                <SelectedsContent>
                                    <div>
                                        <strong>{customerSelected.name}</strong>
                                        <p>CPF: {maskCpf(customerSelected.cpf)}</p>
                                    </div>
                                    <div>
                                        <ButtonRemove type="button" onClick={() => setCustomerSelected(null)}>
                                            <RiDeleteBin7Line size={22} title="Excluir" />
                                        </ButtonRemove>
                                    </div>
                                </SelectedsContent>
                            </Selecteds>
                        </>
                    }
                    
                    <h1>Produtos</h1>
                    <Datalist>
                        <Input 
                            name="products"
                            placeholder="Digite o nome para buscar o produto"
                            list="product" 
                            type="text"
                            value={searchProduct}
                            onChange={e => setSearchProduct(e.target.value)}
                        />
                        { searchProduct.length > 0 &&
                            <DatalistOptions>
                            { products.map(product => (
                                <Option id="product" key={product.id} onClick={() => handleAddProductList(product)}>
                                    <div>
                                        <strong>{product.name}</strong>
                                        {product.code && <p>{product.code}</p>}
                                    </div>
                                    <div>
                                        <p>Preço: R$ {maskMoney(product.price)}</p>
                                        <p>Quant: {product.quantity}</p>
                                    </div>
                                </Option>
                            ))}
                            </DatalistOptions>
                        }
                    </Datalist>
                    { productsSelected.length > 0 && 
                        <>
                            <h2>Selecionados</h2>
                            <Selecteds>
                                { productsSelected.map(product => (
                                    <SelectedsContent key={product.id}>
                                        <div>
                                            <strong>{product.name}</strong>
                                            <p>Preço: R$ {maskMoney(product.price)}</p>
                                            <p>Subtotal: {product.subtotal}</p>
                                            <label>Desconto</label>
                                            <input 
                                                type="text"
                                                placeholder="0.00"
                                                value={product.descont}
                                                onChange={e => handleProductDescont(product, e.target.value)} 
                                            />
                                        </div>
                                        <Amount>
                                            <button
                                                type="button"
                                                disabled={product.quantity <= 1}
                                                onClick={() => handleProductDecrement(product)}
                                                >
                                                <FiMinusCircle size={20} />
                                            </button>
                                            <input
                                                type="text"
                                                readOnly
                                                value={product.quantity}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleProductIncrement(product)}
                                            >
                                                <FiPlusCircle size={20} />
                                            </button>
                                        </Amount>
                                        <div>
                                            <ButtonRemove type="button" onClick={() => handleRemoveProductList(product.id)}>
                                                <RiDeleteBin7Line size={22} title="Excluir" />
                                            </ButtonRemove>
                                        </div>
                                    </SelectedsContent>
                                ))}
                            </Selecteds>
                        </>
                    }

                    <h1>Serviços</h1>
                    <Datalist>
                        <Input 
                            name="jobs"
                            placeholder="Digite o nome para buscar o serviço"
                            list="job" 
                            type="text"
                            value={searchJob}
                            onChange={e => setSearchJob(e.target.value)}
                        />
                        { searchJob.length > 0 &&
                            <DatalistOptions>
                            { jobs.map(job => (
                                <Option id="job" key={job.id} onClick={() => handleAddJobList(job)}>
                                    <div>
                                        <strong>{job.name}</strong>
                                    </div>
                                    <div>
                                        <p>Preço: R$ {maskMoney(job.price)}</p>
                                    </div>
                                </Option>
                            ))}
                            </DatalistOptions>
                        }
                    </Datalist>
                    { jobsSelected.length > 0 && 
                        <>
                            <h2>Selecionados</h2>
                            <Selecteds>
                                { jobsSelected.map(job => (
                                    <SelectedsContent key={job.id}>
                                        <div>
                                            <strong>{job.name}</strong>
                                            <p>Preço: R$ {maskMoney(job.price)}</p>
                                            <p>Subtotal: {job.subtotal}</p>
                                            <label>Desconto</label>
                                            <input 
                                                type="text"
                                                placeholder="0.00"
                                                value={job.descont}
                                                onChange={e => handleJobDescont(job, e.target.value)} 
                                            />
                                        </div>
                                        <Amount>
                                            <button
                                                type="button"
                                                disabled={job.quantity <= 1}
                                                onClick={() => handleJobDecrement(job)}
                                                >
                                                <FiMinusCircle size={20} />
                                            </button>
                                            <input
                                                type="text"
                                                readOnly
                                                value={job.quantity}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleJobIncrement(job)}
                                            >
                                                <FiPlusCircle size={20} />
                                            </button>
                                        </Amount>
                                        <div>
                                            <ButtonRemove type="button" onClick={() => handleRemoveJobList(job.id)}>
                                                <RiDeleteBin7Line size={22} title="Excluir" />
                                            </ButtonRemove>
                                        </div>
                                    </SelectedsContent>
                                ))}
                            </Selecteds>
                        </>
                    }

                    <h1>Colaborador</h1>
                    <Datalist>
                        <Input 
                            name="employees"
                            placeholder="Digite o nome para buscar o colaborador"
                            list="employee" 
                            type="text"
                            value={searchEmployee}
                            onChange={e => setSearchEmployee(e.target.value)}
                        />
                        { searchEmployee.length > 0 &&
                            <DatalistOptions>
                            { employees.map(employee => (
                                <Option id="employee" key={employee.id} onClick={() => handleAddEmployeeList(employee)}>
                                    <div>
                                        <strong>{employee.name}</strong>
                                    </div>
                                </Option>
                            ))}
                            </DatalistOptions>
                        }
                    </Datalist>
                    { employeesSelected.length > 0 && 
                        <>
                            <h2>Selecionados</h2>
                            <Selecteds>
                                { employeesSelected.map(employee => (
                                    <SelectedsContent key={employee.id}>
                                        <div>
                                            <strong>{employee.name}</strong>
                                            <label>Comissão</label>
                                            <input 
                                                type="text"
                                                placeholder="0.00"
                                                value={employee.commission}
                                                onChange={e => handleEmployeeCommission(employee, e.target.value)} 
                                            />
                                        </div>
                                        <div>
                                            <ButtonRemove type="button" onClick={() => handleRemoveEmployeeList(employee.id)}>
                                                <RiDeleteBin7Line size={22} title="Excluir" />
                                            </ButtonRemove>
                                        </div>
                                    </SelectedsContent>
                                ))}
                            </Selecteds>
                        </>
                    }

                    
                    <ValueContent>
                        <span>TOTAL</span>
                        <strong>{total}</strong>
                    </ValueContent>          
                    <Button type="submit">Finalizar venda</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default RegisterSale;