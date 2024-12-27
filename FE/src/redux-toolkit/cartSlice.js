import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGetAllProductCart } from "../services/cartService";
import { toast } from "react-toastify";
import { logOut } from "./userSlice";

const initialState = {
  allProduct: [],
  totalProduct: null,
};

export const fetchAllProductCart = createAsyncThunk(
  "cart/fetchAllProductCart",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllProductCart(params.userId);
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllProductCartSuccess(res?.data));
      } else {
        thunkAPI.dispatch(fetchAllProductCartFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllProductCartFailed());
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchAllProductCartSuccess: (state, action) => {
      state.allProduct = action.payload.products;
      state.totalProduct = action.payload.totalProduct;
    },
    fetchAllProductCartFailed: (state, action) => {
      state.allProduct = [];
      state.totalProduct = null;
    },
    updateAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
  },
});

export const {
  fetchAllProductCartSuccess,
  fetchAllProductCartFailed,
  updateAllProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
