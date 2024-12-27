import axios, { axiosAuth } from "../axios";

let handleGetAllProductTypeService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/product-type/get-all-product-type?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};

let handleCreateProductTypeService = (data) => {
  return axiosAuth.post(`/api/product-type/create-product-type`, data);
};

let handleUpdateProductTypeService = (data) => {
  return axiosAuth.put(`/api/product-type/update-product-type`, data);
};

let handleDeleteProductTypeService = (id) => {
  return axiosAuth.delete(`/api/product-type/delete-product-type?id=${id}`);
};

let handleGetProductTypeDetailService = (id) => {
  return axios.get(`/api/product-type/get-product-type-detail?id=${id}`);
};

let handleGetAllBrandService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/brand/get-all-brand?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};

let handleCreateBrandService = (data) => {
  return axiosAuth.post(`/api/brand/create-brand`, data);
};

let handleUpdateBrandService = (data) => {
  return axiosAuth.put(`/api/brand/update-brand`, data);
};

let handleDeleteBrandService = (id) => {
  return axiosAuth.delete(`/api/brand/delete-brand?id=${id}`);
};

let handleGetBrandDetailService = (id) => {
  return axiosAuth.get(`/api/brand/get-brand-detail?id=${id}`);
};

let handleGetAllSizeService = (limit, page, name) => {
  return axiosAuth.get(
    `/api/size/get-all-size?limit=${limit}&page=${page}&name=${name}`
  );
};

let handleCreateSizeService = (data) => {
  return axiosAuth.post(`/api/size/create-size`, data);
};

let handleUpdateSizeService = (data) => {
  return axiosAuth.put(`/api/size/update-size`, data);
};

let handleDeleteSizeService = (id) => {
  return axiosAuth.delete(`/api/size/delete-size?id=${id}`);
};

let handleGetSizeDetailService = (id) => {
  return axiosAuth.get(`/api/size/get-size-detail?id=${id}`);
};

let handleGetAllProductService = (limit, page, name) => {
  return axios.get(
    `/api/product/get-all-product?limit=${limit}&page=${page}&name=${encodeURIComponent(
      name
    )}`
  );
};

let handleGetProductDetailService = (id) => {
  return axiosAuth.get(`/api/product/get-product-detail-admin?id=${id}`);
};

let handleCreateProductService = (data) => {
  return axiosAuth.post(`/api/product/create-product`, data);
};

let handleUpdateProductService = (data) => {
  return axiosAuth.put(`/api/product/update-product`, data);
};

let handleDeleteProductService = (id) => {
  return axiosAuth.delete(`/api/product/delete-product?id=${id}`);
};

let handleGetProductService = (productId) => {
  return axiosAuth.get(`/api/product/get-product?productId=${productId}`);
};

let handleGetAllProductSizeService = (productId, limit, page) => {
  return axiosAuth.get(
    `/api/product-size/get-all-product-size?productId=${productId}&limit=${limit}&page=${page}`
  );
};

let handleGetAllSizeOfTheProductType = (productTypeId) => {
  return axiosAuth.get(
    `/api/size/get-all-size-product-type?productTypeId=${productTypeId}`
  );
};

let handleCreateProductSizeService = (data) => {
  return axiosAuth.post(`/api/product-size/create-product-size`, data);
};

let handleDeleteProductSizeService = (id) => {
  return axiosAuth.delete(`/api/product-size/delete-product-size?id=${id}`);
};

let handleUpdateProductSizeService = (data) => {
  return axiosAuth.put(`/api/product-size/update-product-size`, data);
};

let handleGetProductSizeDetailService = (id) => {
  return axiosAuth.get(`/api/product-size/get-product-size-detail?id=${id}`);
};

let handleCreateNewVoucher = (data) => {
  return axiosAuth.post(`/api/voucher/create-voucher`, data);
};

let handleUpdateVoucherService = (data) => {
  return axiosAuth.put(`/api/voucher/update-voucher`, data);
};

let handleDeleteVoucher = (id) => {
  return axiosAuth.delete(`/api/voucher/delete-voucher?id=${id}`);
};

let handleGetAllVoucher = (limit, page, pagination) => {
  return axiosAuth.get(
    `/api/voucher/get-all-voucher?limit=${limit}&page=${page}&pagination=${pagination}`
  );
};

let handleGetVoucherDetail = (id) => {
  return axiosAuth.get(`/api/voucher/get-voucher-detail?id=${id}`);
};

let handleGetProductName = (productId) => {
  return axios.get(`/api/product/get-product-name?productId=${productId}`);
};

export {
  handleGetAllProductTypeService,
  handleCreateProductTypeService,
  handleUpdateProductTypeService,
  handleDeleteProductTypeService,
  handleGetProductTypeDetailService,
  handleGetAllBrandService,
  handleCreateBrandService,
  handleUpdateBrandService,
  handleDeleteBrandService,
  handleGetBrandDetailService,
  handleGetAllSizeService,
  handleCreateSizeService,
  handleUpdateSizeService,
  handleDeleteSizeService,
  handleGetSizeDetailService,
  handleGetAllProductService,
  handleCreateProductService,
  handleUpdateProductService,
  handleDeleteProductService,
  handleGetProductDetailService,
  handleGetProductService,
  handleGetAllProductSizeService,
  handleGetAllSizeOfTheProductType,
  handleCreateProductSizeService,
  handleDeleteProductSizeService,
  handleUpdateProductSizeService,
  handleGetProductSizeDetailService,
  handleCreateNewVoucher,
  handleUpdateVoucherService,
  handleDeleteVoucher,
  handleGetAllVoucher,
  handleGetVoucherDetail,
  handleGetProductName,
};
