import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGetAllUserService,
  handleGetAllRoleService,
} from "../services/userService";
import dayjs from "dayjs";
import {
  handleGetAllBrandService,
  handleGetAllProductTypeService,
  handleGetAllSizeService,
  handleGetAllProductService,
  handleGetAllProductSizeService,
  handleGetAllSizeOfTheProductType,
  handleGetAllVoucher,
} from "../services/productService";
import { handleGetAllBlogService } from "@/services/blogService";
import {
  handleGetAllOrderAdmin,
  handleGetAllProductReport,
} from "../services/orderService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "./userSlice";

const initialState = {
  isLoading: false,
  allUser: [],
  allRole: [],
  allBrand: [],
  allBlog: [],
  allProductType: [],
  allSize: [],
  allProduct: [],
  allProductSize: [],
  allProductSizeF: [],
  allProductSizeOfTheProductType: [],
  allVoucher: [],
  allOrder: [],
  allProductOrder: [],
  searchTextProductAdmin: null,
  timeReport: {
    timeStart: dayjs(dayjs().startOf("month").toDate()).valueOf(),
    timeEnd: dayjs(dayjs().endOf("month").toDate()).valueOf(),
  },
};

export const fetchAllUserRedux = createAsyncThunk(
  "admin/fetchAllUserRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllUserService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllUserSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(fetchAllUserFailed());
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllRoleRedux = createAsyncThunk(
  "admin/fetchAllRoleRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllRoleService();
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllRoleSuccess(res?.data));
      } else {
        thunkAPI.dispatch(fetchAllRoleFailed());
      }
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(fetchAllRoleFailed());
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllBrandRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllBrandService(
        params?.limit,
        params?.page,
        params?.name,
        params?.pagination
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllBrandSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllBrandFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllBrandFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllBlogRedux = createAsyncThunk(
  "admin/fetchAllBlogRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllBlogService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllBlogSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllBlogFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllBlogFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllProductTypeRedux = createAsyncThunk(
  "admin/fetchAllProductTypeRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductTypeService(
        params?.limit,
        params?.page,
        params?.name,
        params?.pagination
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductTypeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductTypeFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductTypeFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllSizeRedux = createAsyncThunk(
  "admin/fetchAllSizeRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllSizeService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllSizeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllSizeFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllSizeFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllProductRedux = createAsyncThunk(
  "admin/fetchAllProductRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductService(
        params?.limit,
        params?.page,
        params?.name
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllProductSizeRedux = createAsyncThunk(
  "admin/fetchAllProductSizeRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductSizeService(
        params?.productId,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSizeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductSizeFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductSizeFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllProductSizeOfTheProductTypeRedux = createAsyncThunk(
  "admin/fetchAllProductSizeOfTheProductTypeRedux",
  async (productTypeId, thunkAPI) => {
    try {
      let res = await handleGetAllSizeOfTheProductType(productTypeId);
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(
          fetchAllProductSizeOfTheProductTypeSuccess(res?.data)
        );
      } else {
        thunkAPI.dispatch(fetchAllProductSizeOfTheProductTypeFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductSizeOfTheProductTypeFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllVoucherRedux = createAsyncThunk(
  "admin/fetchAllVoucherRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllVoucher(
        params?.limit,
        params?.page,
        params?.pagination
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllVoucherSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllVoucherFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllVoucherFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllOrderAdminRedux = createAsyncThunk(
  "admin/fetchAllOrderAdminRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllOrderAdmin(
        params?.status,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllOrderSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllOrderFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllOrderFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllProductOrderRedux = createAsyncThunk(
  "admin/fetchAllProductOrderRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductReport(
        params?.timeStart,
        params?.timeEnd,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductOrderSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductOrderFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductOrderFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const fetchAllProductSizeFRedux = createAsyncThunk(
  "admin/fetchAllProductSizeFRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductSizeService(
        params?.productId,
        "",
        "",
        false
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSizeFSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductSizeFFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductSizeFFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loadingAdmin: (state, action) => {
      state.isLoading = action.payload;
    },
    fetchAllUserSuccess: (state, action) => {
      state.allUser = action.payload;
    },
    fetchAllUserFailed: (state, action) => {
      state.allUser = [];
    },
    fetchAllRoleSuccess: (state, action) => {
      state.allRole = action.payload;
    },
    fetchAllRoleFailed: (state, action) => {
      state.allRole = [];
    },
    fetchAllBrandSuccess: (state, action) => {
      state.allBrand = action.payload;
    },
    fetchAllBrandFailed: (state, action) => {
      state.allBrand = [];
    },
    fetchAllProductTypeSuccess: (state, action) => {
      state.allProductType = action.payload;
    },
    fetchAllProductTypeFailed: (state, action) => {
      state.allProductType = [];
    },
    fetchAllSizeSuccess: (state, action) => {
      state.allSize = action.payload;
    },
    fetchAllSizeFailed: (state, action) => {
      state.allSize = [];
    },
    fetchAllProductSuccess: (state, action) => {
      state.allProduct = action.payload;
    },
    fetchAllProductFailed: (state, action) => {
      state.allProduct = [];
    },
    fetchAllProductSizeSuccess: (state, action) => {
      state.allProductSize = action.payload;
    },
    fetchAllProductSizeFailed: (state, action) => {
      state.allProductSize = [];
    },
    fetchAllProductSizeOfTheProductTypeSuccess: (state, action) => {
      state.allProductSizeOfTheProductType = action.payload;
    },
    fetchAllProductSizeOfTheProductTypeFailed: (state, action) => {
      state.allProductSizeOfTheProductType = [];
    },
    fetchAllVoucherSuccess: (state, action) => {
      state.allVoucher = action.payload;
    },
    fetchAllVoucherFailed: (state, action) => {
      state.allVoucher = [];
    },
    fetchAllOrderSuccess: (state, action) => {
      state.allOrder = action.payload;
    },
    fetchAllOrderFailed: (state, action) => {
      state.allOrder = [];
    },
    handleChangeSearchProductAdmin: (state, action) => {
      state.searchTextProductAdmin = action.payload;
    },
    fetchAllProductOrderSuccess: (state, action) => {
      state.allProductOrder = action.payload;
    },
    fetchAllProductOrderFailed: (state, action) => {
      state.allProductOrder = [];
    },
    handleChangeTimeReport: (state, action) => {
      state.timeReport = action.payload;
    },
    fetchAllBlogSuccess: (state, action) => {
      state.allBlog = action.payload;
    },
    fetchAllBlogFailed: (state, action) => {
      state.allBlog = [];
    },
    fetchAllProductSizeFSuccess: (state, action) => {
      state.allProductSizeF = action.payload;
    },
    fetchAllProductSizeFFailed: (state, action) => {
      state.allProductSizeF = [];
    },
  },
});

export const {
  fetchAllUserSuccess,
  fetchAllUserFailed,
  fetchAllRoleSuccess,
  fetchAllRoleFailed,
  loadingAdmin,
  fetchAllBrandSuccess,
  fetchAllBrandFailed,
  fetchAllProductTypeSuccess,
  fetchAllProductTypeFailed,
  fetchAllSizeSuccess,
  fetchAllSizeFailed,
  fetchAllProductSuccess,
  fetchAllProductFailed,
  fetchAllProductSizeSuccess,
  fetchAllProductSizeFailed,
  fetchAllProductSizeOfTheProductTypeSuccess,
  fetchAllProductSizeOfTheProductTypeFailed,
  fetchAllVoucherSuccess,
  fetchAllVoucherFailed,
  fetchAllOrderSuccess,
  fetchAllOrderFailed,
  handleChangeSearchProductAdmin,
  fetchAllProductOrderSuccess,
  fetchAllProductOrderFailed,
  handleChangeTimeReport,
  fetchAllBlogSuccess,
  fetchAllBlogFailed,
} = adminSlice.actions;

export default adminSlice.reducer;
