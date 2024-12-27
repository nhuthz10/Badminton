import { axiosAuth } from "../axios";

let handleCreatCartService = (data) => {
  return axiosAuth.post("/api/cart/create-cart", data);
};

let hadnleAddProductToCart = (data) => {
  return axiosAuth.post(`/api/cart/add-product-to-cart`, data);
};

let handleGetAllProductCart = (userId) => {
  return axiosAuth.get(`/api/cart/get-all-product-cart?userId=${userId}`);
};

let handleUpdateProductCartService = (data) => {
  return axiosAuth.put("/api/cart/update-product-cart", data);
};

let handleDeleteProductCartService = (productId, sizeId, userId) => {
  return axiosAuth.delete(
    `/api/cart/delete-product-cart?productId=${productId}&sizeId=${sizeId}&userId=${userId}`
  );
};

export {
  handleCreatCartService,
  hadnleAddProductToCart,
  handleGetAllProductCart,
  handleUpdateProductCartService,
  handleDeleteProductCartService,
};
