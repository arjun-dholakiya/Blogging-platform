import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import PostList from "./pages/PostList";
import EditPost from "./pages/Editpost"; // Make sure file name is EditPost.jsx
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Post Routes */}
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/edit-post/:id" element={<EditPost />} /> 
        <Route path="/posts/:id" element={<PostDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;