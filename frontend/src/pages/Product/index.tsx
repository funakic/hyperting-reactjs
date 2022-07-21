import React from 'react';
import { Header } from '../../components/Header';
import { ProductTable } from '../../components/ProductTable';

export function Product() {
    return (
        <div>
            <Header title="Products" isList={true} />
            <ProductTable />
        </div>
    );
}