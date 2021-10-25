import React, { TextareaHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    containerStyle?: React.CSSProperties;
}

const Textarea: React.FC<TextareaProps> = ({ name, containerStyle={}, ...rest }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    
    const { fieldName, defaultValue, registerField } = useField(name);

    const handleTextareaFocus = useCallback(() => {
        setIsFocused(true)
    }, []);

    const handleTextareaBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!textareaRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textareaRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container style={containerStyle} isFilled={isFilled} isFocused={isFocused} >
            <textarea
                onFocus={handleTextareaFocus}
                onBlur={handleTextareaBlur} 
                defaultValue={defaultValue} 
                ref={textareaRef}
                {...rest} 
            />
        </Container>
    );
};

export default Textarea;