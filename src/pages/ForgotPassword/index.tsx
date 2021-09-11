import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLogIn, FiMail } from 'react-icons/fi';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.png';

import { 
    Container, 
    SimpleContent, 
    FormContent,
    LegendContent,
    CheckUserContent,
    StyledContent } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const [loading, setLoading] = useState(false);
    const [checkUserMain, setCheckUserMain] = useState(true);
    const [checkUserEmployee, setCheckUserEmployee] = useState(false);

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true);
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/password/forgot', {
                email: data.email,
                type_user: checkUserMain ? 'master' : 'employee'
            });

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
            });
            
        } finally {
            setLoading(false);
        }
    }, [addToast, checkUserMain]);

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
                        <legend>Resgate sua senha</legend>
                        <img src={logo} alt="PsManager"/>
                    </LegendContent>

                    <label htmlFor="email">E-mail</label>
                    <Input name="email" type="email" icon={FiMail} placeholder="joaosilva@exemplo.com" />
                    <CheckUserContent>
                        <input type="checkbox" checked={checkUserMain} onChange={() => handleCheckUser(checkUserMain)}/>
                        <label htmlFor="checkUser">Usuário Principal</label>
                        <input type="checkbox" checked={checkUserEmployee} onChange={() => handleCheckUser(checkUserEmployee)}/>
                        <label htmlFor="checkUser">Colaborador</label>
                    </CheckUserContent>
                    <Button loading={loading} type="submit">Recuperar</Button>
                    <Link to="/sign-in">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </FormContent>
            </Form>
            <StyledContent>
                <div>
                    <p>Sem stress!</p>
                    <p>Vamos te ajudar a ficar conectado novamente. #semTempoPraPerder</p>
                </div>
            </StyledContent>
        </Container>
    );
}

export default ForgotPassword;