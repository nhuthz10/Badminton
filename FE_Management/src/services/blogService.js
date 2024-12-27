import axios, { axiosAuth } from "../axios";

let handleGetAllBlogService = (limit, page, name) => {
  return axiosAuth.get(
    `/api/blog/get-all-admin-blog?limit=${limit}&page=${page}&name=${name}`
  );
};

let handleCreateBlogService = (data) => {
  return axiosAuth.post(`/api/blog/create-blog`, data);
};

let handleUpdateBlogService = (data) => {
  return axiosAuth.put(`/api/blog/update-blog`, data);
};

let handleDeleteBlogService = (id) => {
  return axiosAuth.delete(`/api/blog/delete-blog?id=${id}`);
};

let handleGetBlogDetailService = (id) => {
  return axios.get(`/api/blog/get-blog?blogId=${id}`);
};

export {
  handleGetAllBlogService,
  handleCreateBlogService,
  handleUpdateBlogService,
  handleDeleteBlogService,
  handleGetBlogDetailService,
};
