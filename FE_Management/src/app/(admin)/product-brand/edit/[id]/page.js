"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  handleGetBrandDetailService,
  handleUpdateBrandService,
} from "@/services/productService";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const BrandPost = ({ params }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchBrandDetail = async () => {
    try {
      dispatch(loadingAdmin(false));
      let res = await handleGetBrandDetailService(params.id);
      if (res && res.errCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else if (error?.response?.data?.errCode === 2) {
        toast.error("Thương hiệu không tồn tại");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  useEffect(() => {
    fetchBrandDetail();
  }, []);

  useEffect(() => {
    if (data) {
      setValue("brandID", data.brandId);
      setValue("brandName", data.brandName);
    }
  }, [data, setValue]);

  const onSubmit = async (submitData) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleUpdateBrandService({
        id: data.id,
        brandId: submitData.brandID,
        brandName: submitData.brandName,
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật thông thương hiệu thành công");

        dispatch(handleChangePage(1));
        router.push(`/product-brand`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã thương hiệu đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Tên thương hiệu đã tồn tại");
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Thương hiệu không tồn tại");
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Sửa thương hiệu</h1>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Mã thương hiệu</p>
          <Controller
            control={control}
            name="brandID"
            rules={{
              required: "Nhập mã thương hiệu",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.brandID ? true : false}
                variant="filled"
                hiddenLabel
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                className="modal-add-update-input-text-field"
              />
            )}
          />
          {errors.brandID && (
            <p className="error-message">{errors.brandID.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Tên thương hiệu</p>
          <Controller
            control={control}
            name="brandName"
            rules={{
              required: "Nhập tên thương hiệu",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.brandName ? true : false}
                variant="filled"
                hiddenLabel
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                className="modal-add-update-input-text-field"
              />
            )}
          />
          {errors.brandName && (
            <p className="error-message">{errors.brandName.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="contained" className="btn">
        Cập nhật
      </Button>
    </form>
  );
};

export default BrandPost;
