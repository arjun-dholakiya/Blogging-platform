import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { getAllPostService, deletePostService } from "../services/postService";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);   // always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getAllPostService();
      console.log("API response:", res.data);

      // Normalize response to always be an array
      const fetchedPosts = Array.isArray(res.data)
        ? res.data
        : res.data?.posts || [];

      setPosts(fetchedPosts);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch posts.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePostService(id);
      // Remove post from UI immediately
      setPosts((prev) => prev.filter((post) => post.id !== id));
      alert("Post Deleted Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-5">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Posts</h2>
        <Button onClick={() => navigate("/create-post")} variant="success">
          + Create New Post
        </Button>
      </div>

      {(!Array.isArray(posts) || posts.length === 0) ? (
        <div className="text-center mt-5">
          <p className="text-muted">No posts available.</p>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/create-post")}
          >
            Create Your First Post
          </Button>
        </div>
      ) : (
        posts.map((post) => (
          <Card className="p-3 mb-3 shadow-sm" key={post.id}>
            <h4>{post.title}</h4>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Date: {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p>{post.content?.substring(0, 150)}...</p>

            <div className="d-flex gap-2">
              <Button
                variant="info"
                size="sm"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                Read More
              </Button>
              <Button
                variant="warning"
                size="sm"
                onClick={() => navigate(`/edit-post/${post.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default PostList;