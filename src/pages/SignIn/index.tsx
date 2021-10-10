import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLock, FiMail } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.png';

import { 
    Container, 
    SimpleContent, 
    FormContent,
    LegendContent,
    CheckUserContent,
    LinksContent,
    StyledContent } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface SignInFormData {
    email: string;
    password: string;
}

interface Error {
    response: {
        data: {
            message: string;
        }
        status: number;
    }
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const history = useHistory();

    const [checkUserMain, setCheckUserMain] = useState(true);
    const [checkUserEmployee, setCheckUserEmployee] = useState(false);

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
                password: Yup.string().required('Senha obrigatoria'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
                type_user: checkUserMain ? 'master' : 'employee'
            });

            history.push('/dashboard');
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            const statusError: Error = error;

            if(statusError.response.status === 303) {
                const user_id = statusError.response.data.message.replace('Cannot enter application due to lack of basic data user:','');

                history.push(`company-register/${user_id}`);

                return;
            }

            addToast({
                type: 'error',
                title: 'Falha na autenticação',
                description: 'Ocorreu uma falha ao fazer login, cheque as credenciais.',
            });
        }
    }, [signIn, addToast, checkUserMain, history]);

    function handleCheckUser(checkUser: boolean) {
        if(!checkUser){
            if(checkUserMain) {
                setCheckUserMain(false)
                setCheckUserEmployee(true)
            } else {
                setCheckUserMain(true)
                setCheckUserEmployee(false)
            }
        }
    }

    return(
        <Container>
            <SimpleContent>
                
            </SimpleContent>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <FormContent>
                    <LegendContent>
                        <legend>Entrar | Faça seu login</legend>
                        <img src={logo} alt="PsManager"/>
                    </LegendContent>

                    <label htmlFor="email">E-mail</label>
                    <Input name="email" type="email" icon={FiMail} placeholder="joaosilva@exemplo.com" />
                    <label htmlFor="password">Senha</label>
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                    <LinksContent>
                        <p>Não tem uma conta? <Link to="/">Crie uma!</Link> |</p>
                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </LinksContent>
                    <CheckUserContent>
                        <input type="checkbox" checked={checkUserMain} onChange={() => handleCheckUser(checkUserMain)}/>
                        <label htmlFor="checkUser">Usuário Principal</label>
                        <input type="checkbox" checked={checkUserEmployee} onChange={() => handleCheckUser(checkUserEmployee)}/>
                        <label htmlFor="checkUser">Colaborador</label>
                    </CheckUserContent>
                    <Button type="submit">Acessar</Button>
                </FormContent>
            </Form>
            <StyledContent>
                <div>
                    <p>Vamos lá!</p>
                    <p>Quanto mais organizar seu negócio por dentro, menos terá que organizá-lo por fora</p>
                </div>
            </StyledContent>
        </Container>
    );
}

export default SignIn;