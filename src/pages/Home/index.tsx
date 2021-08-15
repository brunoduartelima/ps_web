import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiCreditCard, FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import api from '../../services/api';

import { 
    Container, 
    Header, 
    HeaderContent, 
    Main, 
    Description,
    Register,
    RegisterContent,
    FormContent,
    UserFormContent,
    Footer
} from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import { mask_cpf, mask_phone } from '../../utils/inputMasks';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';
import graphic from '../../assets/graphic.png';

interface RegisterFormData {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
}


const Home: React.FC = () => {
    const [document, setDocument] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: RegisterFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                cpf: Yup.string().required('CPF obrigatório'),
                phone: Yup.string().required('Telefone obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const user = await api.post('/users', data);

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

        }
    }, []);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="Personal Manager" />
                    <Button type="button">Entrar</Button>
                </HeaderContent>
            </Header>
            <Main>
                <Description>
                    <h1>Conecte-se.<br/>Organize-se.<br/>Prospere.</h1>
                    <img src={graphic} alt="Gráfico"/>
                    <h2>Gerencie seus clientes, produtos/serviços e despesas com um sistema<br/>
                        apropriado e <strong>muito simples de se usar</strong>. O <strong>Personal Manager</strong> vai te ajudar<br/>
                        a organizar seus lucros e gastos de uma forma muito mais inteligente e eficaz,<br/>
                        ajudando você a finalmente conseguir <strong>separar a Pessoa Física do CNPJ</strong>.
                    </h2>
                    <h3>E o melhor de tudo: <strong>independente do seu negócio</strong>.</h3>
                </Description>
                <Register>
                    <RegisterContent>
                        <section>
                            <h1>Abra uma conta</h1>
                            <p>Faça seu cadastro.<br/>Entre na plataforma e gerencie sua empresa de uma maneira facíl e moderna.</p>
                        </section>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <FormContent>
                                <legend>Dados Cadatrais</legend>
                                
                                <label htmlFor="name">Nome completo</label>
                                <Input name="name" icon={FiUser} placeholder="João da Silva" />

                                <label htmlFor="cpf">CPF</label>
                                <Input value={document} onChange={e => setDocument(mask_cpf(e.target.value))} name="cpf" icon={FiCreditCard} placeholder="123.456.789-00" />

                                <label htmlFor="phone">Telefone</label>
                                <Input value={phone} onChange={e => setPhone(mask_phone(e.target.value))} name="phone" type="tel" icon={FiPhone} placeholder="(11) 91234 5679" />
                            </FormContent>
                            <UserFormContent>
                                <legend>Dados Login</legend>

                                <label htmlFor="email">E-mail</label>
                                <Input name="email" type="email" icon={FiMail} placeholder="joaosilva@exemplo.com" />

                                <label htmlFor="password">Senha</label>
                                <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                            </UserFormContent>

                            <Button type="submit">Cadastrar</Button>
                        </Form>
                    </RegisterContent>
                </Register>
            </Main>
            <Footer>
                <div>
                    <span>Ícones feitos por </span>
                    <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">
                        Freepik
                    </a> 
                        <span> from </span>
                    <a href="https://www.flaticon.com/br/" title="Flaticon">
                        www.flaticon.com
                    </a>
                </div>
            </Footer>
        </Container>
    );
}

export default Home;