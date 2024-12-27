import axios, { axiosAuth } from "../axios";

let handleLoginService = (email, password) => {
  return axios.post("/api/user/login-user", {
    email: email,
    password: password,
  });
};

let handleGetUserAfterLoginService = async (userId) => {
  return await axiosAuth.get(`/api/user/get-user-infor?userId=${userId}`);
};

let handleRegisterService = (data) => {
  return axios.post("/api/user/register", data);
};

let handleSendOptService = (email) => {
  return axios.post("/api/user/send-otp-code", { email: email });
};

let handleChangePasswordService = (data) => {
  return axios.put("/api/user/change-password", data);
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
  handleRegisterService,
  handleSendOptService,
  handleChangePasswordService,
  handleGetInforUserService,
  handleUpdateUser,
  handleChangePasswordProfile,
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
  handleGetUserAfterLoginService,
  handleRefershTokenService,
};
