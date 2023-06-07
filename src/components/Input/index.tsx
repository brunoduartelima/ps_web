import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: React.CSSProperties;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, containerStyle={}, icon: Icon, ...props}) => {
    const { register, formState: { errors } } = useFormContext();
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, []);

    const handleInputBlur = useCallback((value: string) => {
        setIsFocused(false);

        setIsFilled(!!value);
    }, []);

    return (
        <Container style={containerStyle} isErrored={!!errors[name]} isFilled={isFilled} isFocused={isFocused} >
            {Icon && <Icon size={20} />}
            <input
                id={name}
                onFocus={handleInputFocus}
                onBlurCapture={(e) => handleInputBlur(e.target.value)}
                {...register(name)}
                {...props}
            />

            {errors[name] && 
                <Error title={errors[name]?.message}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            }
        </Container>
    );
};

export default Input;