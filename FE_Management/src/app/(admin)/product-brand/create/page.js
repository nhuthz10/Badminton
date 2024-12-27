"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { handleCreateBrandService } from "@/services/productService";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import CreateCode from "@/utils/commonUtils";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const BrandPost = () => {
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
      let res = await handleCreateBrandService({
        brandId: submitData.brandID,
        brandName: submitData.brandName,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm thương hiệu thành công");
        setValue("brandID", "");
        setValue("brandName", "");

        dispatch(handleChangePage(1));
        router.push(`/product-brand`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã thương hiệu đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Tên thương hiệu đã tồn tại");
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

  const handleChangeBrandName = (e) => {
    if (e.target.value) {
      let brandID = CreateCode(e.target.value);
      setValue("brandID", brandID, { shouldValidate: true });
    } else {
      setValue("brandID", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Thêm thương hiệu</h1>

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
                onChange={(e) => {
                  field.onChange(e);
                  handleChangeBrandName(e);
                }}
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
        Thêm
      </Button>
    </form>
  );
};

export default BrandPost;
