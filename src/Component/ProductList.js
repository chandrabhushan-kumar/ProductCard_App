import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Header from './Header';
import ReactPaginate from 'react-paginate';
import './style.css'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductList = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productsPerPage = 15;

    useEffect(() => {
        Axios.get('https://dummyjson.com/products?limit=0')
            .then((response) => {
                setData(response.data.products);
                setFilteredData(response.data.products);
            })
            .catch((err) => { });
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setFilteredData(data);
        } else {
            const filteredProducts = data.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filteredProducts);
        }
        setPageNumber(0);
    };

    const pageCount = Math.ceil(filteredData.length / productsPerPage);
    const offset = pageNumber * productsPerPage;
    const currentProducts = filteredData.slice(offset, offset + productsPerPage);

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };
    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(!isModalOpen);
    };

    const handleDelete = () => {
        Axios.delete(`https://dummyjson.com/products/${selectedProduct.id}`)
            .then((response) => {
                toast.success('Delete successful!');
                setTimeout(()=>{
                    toggleModal(null);
                },2000)
            })
            .catch((error) => {
                toggleModal(null);
                toast.error('Deletion unsuccessful. Please try again.');

            });
       
    };

    return (
        <>
            <Header onSearch={handleSearch} />

            <div className="container mt-3">
                <h2 className="text-center">Product List</h2>
                {filteredData.length === 0 ? (
                    <p className="text-center">No data available</p>
                ) : (
                    <>
                        <div className="row d-flex justify-content-center align-items-center">
                            {currentProducts.map((element, id) => {
                                return (
                                    <Card key={id} style={{ width: '22rem', border: "none", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="mx-2 mt-4 card_style">
                                        <Card.Img variant="top" src={element.images[0]} style={{ height: '16rem' }} />
                                        <Card.Body>
                                            <Card.Title>{element.title}</Card.Title>
                                            <Card.Text>Price : ₹ {element.price}</Card.Text>
                                            <div className="button_div">
                                                <Link to={`/addproductform/${element.id}`}>
                                                    <Button variant="primary" className="col-lg-5 mr-2 mb-2 headerBtn">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="btn btn-danger" className="col-lg-5 mr-2 mb-2 delete_btn" onClick={() => toggleModal(element)}>
                                                    Delete
                                                </Button>
                                            </div>

                                        </Card.Body>
                                    </Card>

                                );
                            })}
                            <Modal show={isModalOpen} onHide={() => toggleModal(null)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <span> Are you sure you want to delete the product  </span><strong>{selectedProduct ? selectedProduct.title : ''}</strong>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                    <ToastContainer />
                                    <Button variant="secondary" onClick={() => toggleModal(null)}>
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div className="pagination-container">
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                pageCount={pageCount}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductList;
