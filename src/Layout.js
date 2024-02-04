import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './Component/ProductList';
import AddProductForm from './Component/AddProductForm';
import LoginForm from './Component/Login';


const Layout = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="/productList" element={<ProductList />} />
            <Route path="/addproductform" element={<AddProductForm />} />
            <Route path="/addproductform/:id" element={<AddProductForm />} />
            <Route path="*" element={<Navigate to="/productList" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default Layout;
