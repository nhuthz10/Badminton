"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import CreateCode from "@/utils/commonUtils";
import { handleCreateProductTypeService } from "@/services/productService";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const ProductTypePost = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (submitData) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleCreateProductTypeService({
        productTypeId: submitData.typeID,
        productTypeName: submitData.typeName,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm loại sản phẩm thành công");
        setValue("typeID", "");
        setValue("typeName", "");

        dispatch(handleChangePage(1));
        router.push(`/product-type`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã loại sản phẩm đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Tên loại sản phẩm đã tồn tại");
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

  let handleChangeProductTypeName = (e) => {
    if (e.target.value) {
      let typeId = CreateCode(e.target.value);
      setValue("typeID", typeId, { shouldValidate: true });
    } else {
      setValue("typeID", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Thêm loại sản phẩm</h1>
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
                onChange={(e) => {
                  field.onChange(e);
                  handleChangeProductTypeName(e);
                }}
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
        Thêm
      </Button>
    </form>
  );
};

export default ProductTypePost;
