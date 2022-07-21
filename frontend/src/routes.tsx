import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Product } from './pages/Product';
import { ProductForm } from './pages/ProductForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/products/new" component={ProductForm} />
            <Route path="/products/edit/:id" component={ProductForm} />
            <Route path="/products" exact component={Product} />
        </BrowserRouter>
    )
}

export default Routes;