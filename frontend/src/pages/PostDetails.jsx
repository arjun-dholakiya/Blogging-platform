import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getPostByIdService } from "../services/postService";

const PostDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostByIdService(id);
        setPost(res.data.post);
        setLoading(false);
      } catch (err) {
        setError("Post not found or deleted");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  
  // Safety check in case post is still null
  if (!post) return <Alert variant="warning" className="m-5">Post not found</Alert>;

  return (
    <div className="container mt-5">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate("/posts")}>
        ← Back to Feed
      </Button>

      <Card className="p-4 shadow">
        <h2 className="mb-3">{post.title}</h2>
        <p className="text-muted">
          Created: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <hr />
        <p style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem" }}>
            {post.content}
        </p> 
      </Card>
    </div>
  );
};

export default PostDetails;