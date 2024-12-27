import { axiosAuth } from "../axios";

let handleGetOrderDetailService = (orderId, userId) => {
  return axiosAuth.get(
    `/api/order/get-order-detail?orderId=${orderId}&userId=${userId}`
  );
};

let handleDeliveringOrderService = (data) => {
  return axiosAuth.put(`/api/order/delivering-order`, data);
};

let handleSucceedOrderService = (data) => {
  return axiosAuth.put(`/api/order/succeed-order`, data);
};

let handleDeleteOrderService = (orderId) => {
  return axiosAuth.delete(`/api/order/delete-order?orderId=${orderId}`);
};

let handleGetAllOrderAdmin = (status, limit, page) => {
  return axiosAuth.get(
    `/api/order/get-all-order-admin?status=${status}&limit=${limit}&page=${page}`
  );
};

let handleGetAllOrderStatistics = () => {
  return axiosAuth.get(`/api/order/order-statistics`);
};

let handleGetAllProductReport = (timeStart, timeEnd, limit, page) => {
  return axiosAuth.get(
    `/api/order/order-report?timeStart=${timeStart}&timeEnd=${timeEnd}&limit=${limit}&page=${page}`
  );
};

export {
  handleGetAllOrderStatistics,
  handleGetOrderDetailService,
  handleDeliveringOrderService,
  handleGetAllOrderAdmin,
  handleSucceedOrderService,
  handleDeleteOrderService,
  handleGetAllProductReport,
};
