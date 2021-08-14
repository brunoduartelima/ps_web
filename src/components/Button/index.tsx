import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
import imgLoading from '../../assets/img-loading.svg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
    <Container  type="button" {...rest}>
            {loading ? <img src={imgLoading} alt="Personal Manager" /> : children}
    </Container>
);

export default Button;