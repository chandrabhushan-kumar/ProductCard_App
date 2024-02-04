import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './style.css'
import { NavLink } from 'react-router-dom';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };
    const logOut = () => {
        localStorage.removeItem('token')
        window.location.href = "/"
    }
    useEffect(() => {
        let firstName = JSON.parse(localStorage.getItem('firstName'))
        let lastName = JSON.parse(localStorage.getItem('lastName'))
        setFirstName(firstName);
        setLastName(lastName)
    }, [])

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: '60px', alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                <div style={{ color: 'white', fontWeight: 'bold' }}>
                    Welcome, {firstName + " " + lastName}!
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        className='searchbar'
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <NavLink to='/addproductform'> <Button variant="primary" className='headerBtn' type="submit" style={{ margin: '0 10px' }} >
                        Add Product
                    </Button>
                    </NavLink>
                    <Button variant="primary" type="submit" className="headerBtn" onClick={logOut} >
                        Logout
                    </Button>
                </div>

            </Navbar>


        </>
    );
};

export default Header;
