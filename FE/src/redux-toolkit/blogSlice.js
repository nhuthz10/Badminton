import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGetAllBlogService } from "@/services/blogService";
import { toast } from "react-toastify";
import { logOut } from "./userSlice";

const initialState = {
  allBlog: [],
};

export const fetchAllBlogRedux = createAsyncThunk(
  "cart/fetchAllProductCart",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllBlogService(params?.limit, params?.page);
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllBlogSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllBlogFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllBlogFailed());
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

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchAllBlogSuccess: (state, action) => {
      state.allBlog = action.payload;
    },
    fetchAllBlogFailed: (state, action) => {
      state.allBlog = [];
    },
  },
});

export const { fetchAllBlogSuccess, fetchAllBlogFailed } = blogSlice.actions;

export default blogSlice.reducer;
