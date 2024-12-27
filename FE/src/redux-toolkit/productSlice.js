import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGetAllProductService,
  handleGetAllProductOfTheProductType,
  handleGetAllProductSaleOffService,
  handleGetAllProductFavorute,
  handleGetAllBrandService,
  handleGetAllProductTypeService,
} from "../services/productService";
import { toast } from "react-toastify";
import { logOut } from "./userSlice";

const initialState = {
  isLoading: false,
  allProducts: [],
  allBrand: [],
  allProductType: [],
  allProductSaleOff: [],
  allProductFavourite: [],
  allProductOfTheProductType: [],
  filter: {},
  sort: [],
};

export const fetchAllProductRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
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
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    }
  }
);

export const fetchAllProductOfTheProductTypeRedux = createAsyncThunk(
  "admin/fetchAllBrandRedux",
  async (params, thunkAPI) => {
    try {
      if (params?.filter) params.filter = JSON.stringify(params?.filter);
      let res = await handleGetAllProductOfTheProductType(
        params?.productTypeId,
        params?.limit,
        params?.page,
        params?.sort,
        params?.filter
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductOfTheProductTypeSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductOfTheProductTypeFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message, {
          className: "toast-normal",
        });
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

export const fetchAllProductSaleOffRedux = createAsyncThunk(
  "admin/fetchAllProductSaleOffRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductSaleOffService(
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductSaleOffSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductSaleOffFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductSaleOffFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    }
  }
);

export const fetchAllProductFavouriteRedux = createAsyncThunk(
  "admin/fetchAllProductFavouriteRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductFavorute(
        params?.limit,
        params?.page,
        params?.userId
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductFavouriteSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllProductFavouriteFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductFavouriteFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadingProduct: (state, action) => {
      state.isLoading = action.payload;
    },
    fetchAllProductSuccess: (state, action) => {
      state.allProducts = action.payload;
    },
    fetchAllProductFailed: (state, action) => {
      state.allProducts = [];
    },
    fetchAllProductOfTheProductTypeSuccess: (state, action) => {
      state.allProductOfTheProductType = action.payload;
    },
    fetchAllProductOfTheProductTypeFailed: (state, action) => {
      state.allProductOfTheProductType = [];
    },
    handleSortProduct: (state, action) => {
      state.sort = action.payload;
    },
    handleFilterProduct: (state, action) => {
      state.filter = action.payload;
    },
    fetchAllProductSaleOffSuccess: (state, action) => {
      state.allProductSaleOff = action.payload;
    },
    fetchAllProductSaleOffFailed: (state, action) => {
      state.allProductSaleOff = [];
    },
    fetchAllProductFavouriteSuccess: (state, action) => {
      state.allProductFavourite = action.payload;
    },
    fetchAllProductFavouriteFailed: (state, action) => {
      state.allProductFavourite = [];
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
  },
});

export const {
  fetchAllProductSuccess,
  fetchAllProductFailed,
  fetchAllProductOfTheProductTypeSuccess,
  fetchAllProductOfTheProductTypeFailed,
  loadingProduct,
  handleSortProduct,
  handleFilterProduct,
  fetchAllProductSaleOffSuccess,
  fetchAllProductSaleOffFailed,
  fetchAllProductFavouriteSuccess,
  fetchAllProductFavouriteFailed,
  fetchAllBrandSuccess,
  fetchAllBrandFailed,
  fetchAllProductTypeSuccess,
  fetchAllProductTypeFailed,
} = productSlice.actions;

export default productSlice.reducer;