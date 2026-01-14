import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { createPostService } from "../services/postService";
import { useNavigate } from "react-router-dom"; // 1. Import Hook

const CreatePost = () => {
  const navigate = useNavigate(); // 2. Initialize
  const [postData, setPostData] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPostService(postData);
      alert("Post Created Successfully!");
      
      // 3. Redirect to Post List
      navigate("/posts"); 

    } catch (err) {
      alert(err.response?.data?.error || "Error creating post");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "40rem" }} className="p-4 shadow">
        <h3>Create New Post</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Enter Content"
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Publish
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePost;