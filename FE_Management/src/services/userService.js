import axios, { axiosAuth } from "../axios";

let handleLoginService = (email, password) => {
  return axios.post("/api/user/login-admin", {
    email: email,
    password: password,
  });
};

let handleGetUserAfterLoginService = async (userId) => {
  return await axiosAuth.get(`/api/user/get-user-infor?userId=${userId}`);
};

let handleCreateANewUserService = (data) => {
  return axiosAuth.post("/api/user/create-user", data);
};

let handleSendOptService = (email) => {
  return axiosAuth.post("/api/user/send-otp-code", { email: email });
};

let handleChangePasswordService = (data) => {
  return axiosAuth.put("/api/user/change-password", data);
};

let handleGetInforUserService = (id) => {
  return axiosAuth.get(`/api/user/get-user?id=${id}`);
};

let handleUpdateUser = (data) => {
  return axiosAuth.put("/api/user/update-user", data);
};

let handleChangePasswordProfile = (data) => {
  return axiosAuth.put("/api/user/change-password-profile", data);
};

let handleGetAllUserService = (limit, page, name) => {
  return axiosAuth.get(
    `/api/user/get-all-user?limit=${limit}&page=${page}&name=${name}`
  );
};

let handleDeleteService = (id) => {
  return axiosAuth.delete(`/api/user/delete-user?id=${id}`);
};

let handleGetAllRoleService = () => {
  return axiosAuth.get(`/api/user/get-all-role`);
};

let handleCreateFavourite = (data) => {
  return axiosAuth.post("/api/favourite/create-favourite", data);
};

let handleDeleteFavourite = (userId, productId) => {
  return axiosAuth.delete(
    `/api/favourite/delete-favourite?userId=${userId}&productId=${productId}`
  );
};

let handleGetAllFavourite = (userId) => {
  return axiosAuth.get(`/api/favourite/get-all-favourite?userId=${userId}`);
};

let handleGetAllNotificationService = (userId, status) => {
  return axiosAuth.get(
    `/api/notification/get-all-notification-admin?userId=${userId}&status=${status}`
  );
};

let handleUpdateNotificationService = (data) => {
  return axiosAuth.put(`/api/notification/update-notification`, data);
};

let handleRefershTokenService = async (refresh_token) => {
  return await axios.post(
    `/api/user/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    }
  );
};

export {
  handleLoginService,
  handleCreateANewUserService,
  handleSendOptService,
  handleChangePasswordService,
  handleGetInforUserService,
  handleUpdateUser,
  handleChangePasswordProfile,
  handleGetAllUserService,
  handleDeleteService,
  handleGetAllRoleService,
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
  handleGetUserAfterLoginService,
  handleGetAllNotificationService,
  handleUpdateNotificationService,
  handleRefershTokenService,
};
