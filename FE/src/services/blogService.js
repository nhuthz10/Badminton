import axios from "../axios";

let handleGetAllBlogService = (limit, page) => {
  return axios.get(`/api/blog/get-all-user-blog?limit=${limit}&page=${page}`);
};

let handleGetBlogService = (blogId) => {
  return axios.get(`/api/blog/get-blog?blogId=${blogId}`);
};

export { handleGetAllBlogService, handleGetBlogService };
