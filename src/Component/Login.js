import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEye } from "react-icons/bs";

import './style.css'

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const showpsw = () => {
    var x = document.getElementById("passwordError");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      let loginFormData = {
        username: userName,
        password: password,
      };
      setLoading(true);
      Axios.post('https://dummyjson.com/auth/login', loginFormData)
        .then((response) => {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          localStorage.setItem('firstName', JSON.stringify(response.data.firstName));
          localStorage.setItem('lastName', JSON.stringify(response.data.lastName));
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/productList";
          }, 2000);

          toast.success('Login successful!');
        })
        .catch((error) => {
          setLoading(false);
          toast.error('Login failed. Please check your credentials.');
        })

    }
  };

  return (

    <div className="container-fluid  fade_wrapper">
      <div className='login_wrapper'>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username <span className="errorcolor">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!!errors.userName}
            />
            <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password <span className="errorcolor">*</span></Form.Label>
            <div className='passBx'>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                id="passwordError"
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              <Button className="passViewBtn" onClick={showpsw}>
                <BsEye />
              </Button>
            </div>
          </Form.Group>
          <Button type="submit" className='loginButtons popFBtn  wd-100' onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
