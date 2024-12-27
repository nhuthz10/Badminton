"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import {
  handleGetProductTypeDetailService,
  handleUpdateProductTypeService,
} from "@/services/productService";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const ProductTypePost = ({ params }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [data, setData] = useState({});
  const pathname = usePathname();
  const path = pathname.split("/");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setValue("typeID", data.productTypeId);
      setValue("typeName", data.productTypeName);
    }
  }, [data, setValue]);

  const fetchProductTypeDetail = async () => {
    try {
      dispatch(loadingAdmin(false));
      let res = await handleGetProductTypeDetailService(params.id);
      if (res && res.errCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else if (error?.response?.data?.errCode === 2) {
        toast.error("Loại sản phẩm không tồn tại");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  useEffect(() => {
    fetchProductTypeDetail();
  }, []);

  const onSubmit = async (submitData) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleUpdateProductTypeService({
        id: data.id,
        productTypeId: submitData.typeID,
        productTypeName: submitData.typeName,
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật thông loại sản phẩm thành công");

        dispatch(handleChangePage(1));
        router.push(`/product-type`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã loại sản phẩm đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Tên loại sản phẩm đã tồn tại");
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Loại sản phẩm không tồn tại");
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
      <h1 className="model-add-update-header">Sửa loại sản phẩm</h1>
      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Mã loại sản phẩm</p>
          <Controller
            control={control}
            name="typeID"
            rules={{
              required: "Nhập mã loại sản phẩm",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.typeID ? true : false}
                variant="filled"
                hiddenLabel
                size="small"
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                className="modal-add-update-input-text-field"
              />
            )}
          />
          {errors.typeID && (
            <p className="error-message">{errors.typeID.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Tên loại sản phẩm</p>
          <Controller
            control={control}
            name="typeName"
            rules={{
              required: "Nhập tên loại sản phẩm",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.typeName ? true : false}
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
          {errors.typeName && (
            <p className="error-message">{errors.typeName.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="contained" className="btn">
        Cập nhật
      </Button>
    </form>
  );
};

export default ProductTypePost;
