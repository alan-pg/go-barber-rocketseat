import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIisFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField }  = useField(name);
    
    const hanldefocused = useCallback(() => {
        setIisFocused(true);
    },[]);

    const handleInputBluer = useCallback(() => {
            setIisFocused(false);
            setIsFilled(!!inputRef.current?.value);
    },[]);


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);

    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            { Icon && <Icon size={20}/> }
            <input 
                onFocus={hanldefocused} 
                onBlur={handleInputBluer} 
                defaultValue={defaultValue} 
                ref={inputRef} 
                {...rest}/>
                {error && (
                    <Error title={error}>
                        <FiAlertCircle color="#c53030" size={20}/>
                    </Error> 
                )}
        </Container>
    );
}


export default Input;