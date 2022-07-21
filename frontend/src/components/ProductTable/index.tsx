import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from "./styles";
import { Pagination } from '../Pagination';
import { useHistory } from 'react-router-dom';
import Input from '../Input';

interface IProduct {
    _id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    categoryId: string;
    netPrice: number;
    taxRate: number;
}

export function ProductTable() {
    const history = useHistory();
    const [productsList, setProductsList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(0);

    useEffect(() => {
        getProducts(1);
    }, [])
    
    async function getProducts(page: number) {
        let filter = '';

        if (nameFilter !== "") {
            filter += "&name=" + nameFilter;
        }

        if (priceFilter !== 0) {
            filter += "&price=" + priceFilter;
        }

        await api.get(`/products?page=${page}` + filter)
            .then((response) => {
                if (response.status === 200) {
                    setProductsList(response.data?.products);

                    setTotalCount(response.data?.total);
                }
            })
    }

    function onPageChange(page: number) {
        getProducts(page);
    }

    async function handleEditProduct(id: string) {
        history.push(`/products/edit/${id}`)
    }

    async function handleDeleteProduct(id: string) {
        try {
            await api.delete(`/products/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        getProducts(page);
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    function handleFilter() {
        setPage(1);
        getProducts(1);
    }

    return (
        <>
            <Container>
                <text>Name:</text>
                <input
                    name="nameFilter"
                    value={nameFilter}
                    onChange={(e) => { setNameFilter(e.target.value) }}
                />

                <text>Price:</text>
                <input
                    name="priceFilter"
                    type="number"
                    value={priceFilter}
                    onChange={event => setPriceFilter(Number(event.target.value))}
                />

                <button onClick={handleFilter}>
                    Filter
                </button>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {productsList.map((product: IProduct) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.categoryId}</td>
                                <td>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(product.netPrice)}
                                </td>
                                <td>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(product.taxRate)}
                                </td>
                                <td>
                                    {new Intl.DateTimeFormat('en-US').format(
                                        new Date(product.createdAt)
                                    )}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleEditProduct(product._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
            <Pagination
                totalCountOfRegisters={totalCount}
                currentPage={page}
                onPageChange={onPageChange}
            />
        </>
    );
}