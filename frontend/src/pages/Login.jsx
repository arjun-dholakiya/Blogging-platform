import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); // 2. Initialize Hook
  const [type, setType] = useState("normal");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    social_provider: "",
    social_id: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setData((prev) => ({
      ...prev,
      password: newType === "normal" ? prev.password : "",
      email: newType === "normal" ? prev.email : "",
      social_provider: newType === "social" ? prev.social_provider : "",
      social_id: newType === "social" ? prev.social_id : "",
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { ...data, login_type: type };

    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/login", payload);
      alert("Login Successful!");
      
      // Save Token
      localStorage.setItem("token", res.data.token);
      console.log("Logged In:", res.data);
      
      navigate("/create-post"); // 3. Redirect to Create Post

    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>

        {/* Toggle Buttons */}
        <div className="d-flex gap-2 mb-3">
          <Button
            variant={type === "normal" ? "primary" : "secondary"}
            onClick={() => handleTypeChange("normal")}
            className="w-50"
          >
            Normal Login
          </Button>
          <Button
            variant={type === "social" ? "primary" : "secondary"}
            onClick={() => handleTypeChange("social")}
            className="w-50"
          >
            Social Login
          </Button>
        </div>

        <Form onSubmit={handleLogin}>
          {type === "normal" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={data.email} onChange={handleChange} placeholder="Enter Email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter Password" />
              </Form.Group>
            </>
          )}

          {type === "social" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Social Provider</Form.Label>
                <Form.Select name="social_provider" value={data.social_provider} onChange={handleChange}>
                  <option value="">Select Provider</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="apple">Apple</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Social ID</Form.Label>
                <Form.Control name="social_id" value={data.social_id} onChange={handleChange} placeholder="Enter Social ID" />
              </Form.Group>
            </>
          )}

          <Button type="submit" className="w-100 mt-2">Login</Button>
        </Form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;