import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate(); // 2. Initialize Hook
  const [type, setType] = useState('normal'); // normal | social

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    social_provider: '',
    social_id: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle login type change
  const handleTypeChange = (newType) => {
    setType(newType);
    setData((prev) => ({
      ...prev,
      password: newType === 'normal' ? prev.password : '',
      email: newType === 'normal' ? prev.email : '',
      social_provider: newType === 'social' ? prev.social_provider : '',
      social_id: newType === 'social' ? prev.social_id : '',
      name: prev.name // keep name for both types
    }));
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (type === 'normal' && (!data.name || !data.email || !data.password)) {
      alert('Please fill all fields for normal signup');
      return;
    }

    if (
      type === 'social' &&
      (!data.name || !data.social_provider || !data.social_id)
    ) {
      alert('Please fill all fields for social signup');
      return;
    }

    try {
      const payload = { ...data, login_type: type };
      const res = await axios.post('/auth/signup', payload);

      alert('Signup Success! Redirecting to login...');
      console.log(res.data);

      navigate('/login'); // 3. Redirect to Login Page
    } catch (err) {
      alert(err.response?.data?.error || 'Signup Failed');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: '30rem' }} className="p-4 shadow">
        <h3 className="text-center mb-3">Signup</h3>

        {/* Toggle Buttons */}
        <div className="d-flex gap-2 mb-3">
          <Button
            variant={type === 'normal' ? 'primary' : 'secondary'}
            onClick={() => handleTypeChange('normal')}
            className="w-50"
          >
            Normal Signup
          </Button>
          <Button
            variant={type === 'social' ? 'primary' : 'secondary'}
            onClick={() => handleTypeChange('social')}
            className="w-50"
          >
            Social Signup
          </Button>
        </div>

        <Form onSubmit={handleSignup}>
          {/* Normal Signup Fields */}
          {type === 'normal' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  type="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={data.password}
                  type="password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                />
              </Form.Group>
            </>
          )}

          {/* Social Signup Fields */}
          {type === 'social' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

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
                  placeholder="Enter Social ID"
                  required
                />
              </Form.Group>
            </>
          )}

          <Button type="submit" className="w-100 mt-2">
            Sign Up
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
