import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

interface HeaderProps {
    title?: string;
    isList: boolean;
}

export function Header({ title = '', isList }: HeaderProps) {
    function handleNewProduct() {}
    
    return (
        <Container>
            <Content>
                <h1>{title}</h1>
                {isList && <div className="buttons-container"><Link to="/products/new" className="study">New Product</Link></div>}
            </Content>
        </Container>
    )
}