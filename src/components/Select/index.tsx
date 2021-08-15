import React, { useEffect, useRef, useState, useCallback, SelectHTMLAttributes } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    containerStyle?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = ({ name, containerStyle={}, ...rest }) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    
    const [isFocused, setIsFocused] = useState(false);
    
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleSelectFocus = useCallback(() => {
            setIsFocused(true)
    }, []);

    const handleSelectNoFocus = useCallback(() => {
        setIsFocused(false)
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container style={containerStyle} isErrored={!!error} isFocused={isFocused} >
            <select
                onFocus={handleSelectFocus}
                onBlur={handleSelectNoFocus}
                defaultValue={defaultValue} 
                ref={selectRef}
                {...rest} 
            />

            {error && 
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            }
        </Container>
    );
};

export default Select;