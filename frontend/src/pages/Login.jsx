import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; //  use central axios instance

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('normal');

  const [data, setData] = useState({
    email: '',
    password: '',
    social_provider: '',
    social_id: ''
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setData((prev) => ({
      email: newType === 'normal' ? prev.email : '',
      password: newType === 'normal' ? prev.password : '',
      social_provider: newType === 'social' ? prev.social_provider : '',
      social_id: newType === 'social' ? prev.social_id : ''
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (type === 'normal' && (!data.email || !data.password)) {
      alert('Please fill all fields');
      return;
    }

    if (type === 'social' && (!data.social_provider || !data.social_id)) {
      alert('Please fill all fields');
      return;
    }

    try {
      const payload = {
        ...data,
        login_type: type
      };

      const response = await api.post('/auth/login', payload);

      // Save JWT token
      localStorage.setItem('token', response.data.token);

      alert('Login successful!');
      navigate('/create-post');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: '30rem' }} className="p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>

        <div className="d-flex gap-2 mb-3">
          <Button
            variant={type === 'normal' ? 'primary' : 'secondary'}
            onClick={() => handleTypeChange('normal')}
            className="w-50"
          >
            Normal Login
          </Button>
          <Button
            variant={type === 'social' ? 'primary' : 'secondary'}
            onClick={() => handleTypeChange('social')}
            className="w-50"
          >
            Social Login
          </Button>
        </div>

        <Form onSubmit={handleLogin}>
          {type === 'normal' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          {type === 'social' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Social Provider</Form.Label>
                <Form.Select
                  name="social_provider"
                  value={data.social_provider}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Provider</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="apple">Apple</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Social ID</Form.Label>
                <Form.Control
                  name="social_id"
                  value={data.social_id}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          <Button type="submit" className="w-100 mt-2">
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
