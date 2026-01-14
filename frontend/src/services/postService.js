import api from "../api/axios";

export const createPostService = async (data) => {
  return await api.post("/post/create-post", data);
};

export const getAllPostService = async () => {
  return await api.get("/post/fetchAll-post");
};

export const getPostByIdService = async (id) => {
  return await api.get(`/post/fetchSingle-post/${id}`);
};

export const updatePostService = async (id, data) => {
  return await api.put(`/post/update-post/${id}`, data);
};

export const deletePostService = async (id) => {
  return await api.delete(`/post/delete-post/${id}`);
};
