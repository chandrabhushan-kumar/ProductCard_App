import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const AddProductForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    useEffect(() => {

        Axios.get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                const productData = response.data;
                setFormData({
                    title: productData.title,
                    description: productData.description,
                    price: productData.price,
                    stock: productData.stock,
                });

            })
            .catch((err) => {
            })


    }, [id])

    const validateForm = () => {
        const newErrors = {};


        if (!formData.title.trim()) {
            newErrors.title = 'Product Name is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (typeof formData.price === 'string' && !formData.price.trim()) {
            newErrors.price = 'Price is required';
        }

        if (typeof formData.stock === 'string' && !formData.stock.trim()) {
            newErrors.stock = 'Quantity is required';
        }
        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const requestMethod = id ? 'PUT' : 'POST';
            const requestUrl = id ? `https://dummyjson.com/products/${id}` : 'https://dummyjson.com/products/add';

            Axios({
                method: requestMethod,
                url: requestUrl,
                data: formData,
            })
                .then((response) => {
                    if (id) {                    
                        toast.success('Product details updated successfully');
                    } else {
                        toast.success('Product details added successfully');
                    }

                    setFormData({
                        title: '',
                        description: '',
                        price: '',
                        stock: '',
                    });
                })
                .catch((err) => {
                    toast.error('Product details not saved');
                });
        }
    };

    return (
        <div className="container-fluid  fade_wrapper">
            <div className='login_wrapper add_productWrapper'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Name <span className="errorcolor">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formProductDescription">
                        <Form.Label>Description <span className="errorcolor">*</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter product description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price <span className="errorcolor">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formProductQuantity">
                        <Form.Label>Quantity <span className="errorcolor">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product quantity"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            isInvalid={!!errors.stock}
                        />
                        <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className='loginButtons popFBtn  wd-100'>
                        {id ? 'Update Product' : 'Add Product'}
                    </Button>
                    <ToastContainer />
                </Form>
            </div>
        </div>
    );
};

export default AddProductForm;
