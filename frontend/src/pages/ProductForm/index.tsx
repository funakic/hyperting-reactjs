import React, { useEffect, useState } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import { Header } from '../../components/Header';
import Input from '../../components/Input';
import { api } from '../../services/api';
import { Container } from './styles';

interface RouterProps {
    id: string;
}

interface IdDetailsProps extends RouteComponentProps<RouterProps> {}

export function ProductForm({match}: IdDetailsProps) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [netPrice, setNetPrice] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [productId, setProductId] = useState('');

    useEffect(() => {
        if (match.params.id) {
            setIsEdit(true);
            setProductId(match.params.id);
            getProduct(match.params.id);
        }        
    }, []);

    async function getProduct(id: string) {
        await api.get(`/products/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    const productReponse = response.data;

                    setName(productReponse.name);
                    setDescription(productReponse.description);
                    setCategoryId(productReponse.categoryId);
                    setNetPrice(productReponse.netPrice);
                    setTaxRate(productReponse.taxRate);
                }
            })
    }

    async function handleSaveProduct() {
        if (!isEdit) {
            await api.post(`/products`, {
                    name,
                    description,
                    categoryId,
                    netPrice,
                    taxRate
                }).then((response) => {
                    if (response.status === 200) {
                        history.push('/products')
                    }
                })
        } else {
            await api.put(`/products/${productId}`, {
                name,
                description,
                categoryId,
                netPrice,
                taxRate,
                updatedAt: Date.now()
            }).then((response) => {
                if (response.status === 200) {
                    history.push('/products')
                }
            })
        }
    }

    return (
        <Container>
            <div>
                <Header title="Products" isList={false} />

                <main>
                    
                    <fieldset>
                        <Input
                            name="name"
                            label="Product Name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input
                            name="description"
                            label="Product Description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />

                        <Input
                            name="categoryId"
                            label="Product Category"
                            value={categoryId}
                            onChange={event => setCategoryId(event.target.value)}
                        />

                        <Input
                            name="netPrice"
                            label="Price"
                            type="number"
                            value={netPrice}
                            onChange={event => setNetPrice(Number(event.target.value))}
                        />

                        <Input
                            name="taxRate"
                            label="Tax"
                            type="number"
                            value={taxRate}
                            onChange={event => setTaxRate(Number(event.target.value))}
                        />
                    </fieldset>

                    <footer>
                        <button onClick={handleSaveProduct}>
                            Save
                        </button>
                    </footer>
                </main>
            </div>
        </Container>
    );
}