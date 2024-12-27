import axios, { axiosAuth, axiosRed } from "../axios";

let handleGetProductTypeService = (productTypeId) => {
  return axios.get(
    `/api/product-type/get-product-type?productTypeId=${productTypeId}`
  );
};

let handleGetAllProductTypeService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/product-type/get-all-product-type?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};

let handleGetAllProductService = (limit, page, name) => {
  return axios.get(
    `/api/product/get-all-product?limit=${limit}&page=${page}&name=${encodeURIComponent(
      name
    )}`
  );
};

let handleGetProductService = (productId) => {
  return axios.get(`/api/product/get-product?productId=${productId}`);
};

let handleGetAllProductOfTheProductType = (
  productTypeId,
  limit,
  page,
  sort,
  filter
) => {
  return axios.get(
    `/api/product/get-all-product-of-the-product-type?productTypeId=${productTypeId}&limit=${limit}&page=${page}&sort=${sort}&filter=${filter}`
  );
};

let handleGetAllVoucherUserService = () => {
  return axios.get(`/api/voucher/get-all-voucher-user`);
};

let handleGetAllProductFeedback = (userId) => {
  return axiosAuth.get(`/api/product/get-product-feedback?userId=${userId}`);
};

let handleCreateFeedbackService = (data) => {
  return axiosAuth.post(`/api/feedback/create-feedback`, data);
};

let handleAllFeedbackService = (productId) => {
  return axios.get(`/api/feedback/get-all-feedback?productId=${productId}`);
};

let handleUpdateFeedbackService = (data) => {
  return axiosAuth.put(`/api/feedback/update-feedback`, data);
};

let handleDeleteFeedbackService = (id, userId) => {
  return axiosAuth.delete(
    `/api/feedback/delete-feedback?feedbackId=${id}&userId=${userId}`
  );
};

let handleGetAllProductSaleOffService = (limit, page) => {
  return axios.get(
    `/api/product/get-product-sale-off?limit=${limit}&page=${page}`
  );
};

let handleGetAllProductFavorute = (limit, page, userId) => {
  return axiosAuth.get(
    `/api/product/get-product-favourite?userId=${userId}&limit=${limit}&page=${page}`
  );
};

let handleGetProductName = (productId) => {
  return axios.get(`/api/product/get-product-name?productId=${productId}`);
};

let handleGetAllBrandService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/brand/get-all-brand?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};

let handleGetProductRecommendation = (productId) => {
  return axiosRed.get(`/api/product/recommendation?productId=${productId}`);
};

export {
  handleGetProductRecommendation,
  handleGetProductTypeService,
  handleGetAllProductTypeService,
  handleGetAllProductService,
  handleGetProductService,
  handleGetAllProductOfTheProductType,
  handleGetAllVoucherUserService,
  handleGetAllProductFeedback,
  handleCreateFeedbackService,
  handleAllFeedbackService,
  handleUpdateFeedbackService,
  handleDeleteFeedbackService,
  handleGetAllProductSaleOffService,
  handleGetAllProductFavorute,
  handleGetProductName,
  handleGetAllBrandService,
};
