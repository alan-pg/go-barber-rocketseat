import React from 'react';
import { Container } from './style';

interface TooltipProps {
    title: string;
    className?: string;
}
const Tooltip: React.FC<TooltipProps> = ({ title, className = '', children }) => {
    console.log('title: ', title);
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    )
}

export default Tooltip;