import React, { useEffect, useState } from "react";
import { Card, Form, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getPostByIdService, updatePostService } from "../services/postService";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  // 1. Fetch existing data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostByIdService(id);
        
        // FIX: Access res.data.post (because your backend wraps it in 'post')
        const data = res.data.post || res.data; 
        
        setPostData({ 
            title: data.title, 
            content: data.content 
        });
        setLoading(false);
      } catch (err) {
        alert("Failed to load post data");
        navigate("/posts");
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  // 2. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePostService(id, postData);
      alert("Post Updated Successfully!");
      navigate("/posts");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error updating post");
    }
  };

  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="grow" variant="primary" /></div>;

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "45rem" }} className="custom-card p-5">
        <h2 className="gradient-text mb-4">Edit Story</h2>
        
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-muted small text-uppercase">Title</Form.Label>
            <Form.Control
              className="custom-input fs-4 fw-bold"
              name="title"
              value={postData.title}
              onChange={handleChange}
              required
              style={{height: '60px'}}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-muted small text-uppercase">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              name="content"
              className="custom-input"
              value={postData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex gap-3">
            <Button type="submit" className="btn-gradient w-50 d-flex align-items-center justify-content-center gap-2">
              <CheckCircle /> Save Changes
            </Button>
            <Button variant="light" className="w-50 d-flex align-items-center justify-content-center gap-2 text-muted" onClick={() => navigate("/posts")}>
              <XCircle /> Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditPost;