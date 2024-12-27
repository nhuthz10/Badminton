import { axiosAuth } from "../axios";

let handleCreateNewOrderService = (data) => {
  return axiosAuth.post("/api/order/create-order", data);
};

let handleGetAllOrderService = (userId, status, limit, page) => {
  return axiosAuth.get(
    `/api/order/get-all-order?userId=${userId}&status=${status}&limit=${limit}&page=${page}`
  );
};

let handleGetOrderDetailService = (orderId, userId) => {
  return axiosAuth.get(
    `/api/order/get-order-detail?orderId=${orderId}&userId=${userId}`
  );
};

let handleCancleOrderService = (data) => {
  return axiosAuth.put(`/api/order/cancle-order`, data);
};

let handlePaymentByVnPayService = (data) => {
  return axiosAuth.post(`/api/order/create_payment_url`, data);
};

export {
  handleCreateNewOrderService,
  handleGetAllOrderService,
  handleGetOrderDetailService,
  handleCancleOrderService,
  handlePaymentByVnPayService,
};
