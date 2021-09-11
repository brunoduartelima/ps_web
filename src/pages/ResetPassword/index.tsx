import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';

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

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    
    const location = useLocation();
    const history = useHistory();
    const { addToast } = useToast();
    
    const [checkUserMain, setCheckUserMain] = useState(true);
    const [checkUserEmployee, setCheckUserEmployee] = useState(false);


    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({   
                password: Yup.string().required('Senha obrigatoria'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password'), null], 'Confirmação incorreta',
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { password, password_confirmation } = data;

            const token = location.search.replace('?token=', '');

            await api.post('/password/reset', {
               password,
               password_confirmation, 
               token,
               type_user: checkUserMain ? 'master' : 'employee'
            });

            history.push('/sign-in');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);
                
                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
            });
            
        }
    }, [addToast, history, location.search, checkUserMain]);

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
                        <legend>Reset sua senha</legend>
                        <img src={logo} alt="PsManager"/>
                    </LegendContent>

                    <label htmlFor="password">Nova senha</label>
                    <Input name="password" type="password" icon={FiLock} placeholder="Nova senha" />
                    <label htmlFor="password_confirmation">Confirme a senha</label>
                    <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirme a senha" />
                    <CheckUserContent>
                        <input type="checkbox" checked={checkUserMain} onChange={() => handleCheckUser(checkUserMain)}/>
                        <label htmlFor="checkUser">Usuário Principal</label>
                        <input type="checkbox" checked={checkUserEmployee} onChange={() => handleCheckUser(checkUserEmployee)}/>
                        <label htmlFor="checkUser">Colaborador</label>
                    </CheckUserContent>
                    <Button type="submit">Alterar senha</Button>
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

export default ResetPassword;