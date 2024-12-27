"use client";
import React, { useEffect } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleCreateSizeService } from "@/services/productService";
import {
  loadingAdmin,
  fetchAllProductTypeRedux,
} from "@/redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateCode from "@/utils/commonUtils";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const SizePost = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const productTypeData = useSelector(
    (state) => state.admin?.allProductType?.data
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const fetchAllData = async () => {
    await dispatch(
      fetchAllProductTypeRedux({
        pagination: false,
      })
    );
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const onSubmit = async (submitData) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleCreateSizeService({
        sizeId: submitData.sizeID,
        productTypeId: submitData.productType,
        sizeName: submitData.sizeName,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm size thành công");
        setValue("sizeID", "");
        setValue("productType", "");
        setValue("sizeName", "");

        dispatch(handleChangePage(1));
        router.push(`/product-size`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã size đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Tên size đã tồn tại");
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

  const handleChangeSizeName = (e) => {
    if (e.target.value) {
      let sizeId = CreateCode(e.target.value);
      setValue("sizeID", sizeId, { shouldValidate: true });
    } else {
      setValue("sizeID", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Thêm size</h1>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Loại sản phẩm</p>
          <Controller
            control={control}
            name="productType"
            rules={{
              required: "Chọn mã size",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.productType ? true : false}
                select
                variant="filled"
                hiddenLabel
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                SelectProps={{
                  IconComponent: () => (
                    <ArrowDropDownIcon
                      style={{
                        fontSize: "3.5rem",
                      }}
                    />
                  ),
                }}
                className="modal-add-update-input-text-field"
              >
                {productTypeData &&
                  productTypeData.length > 0 &&
                  productTypeData.map((option) => (
                    <MenuItem
                      key={option.productTypeId}
                      value={option.productTypeId}
                      style={{
                        fontSize: "var(--text-fontSize)",
                      }}
                    >
                      {option.productTypeName}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          {errors.productType && (
            <p className="error-message">{errors.productType.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Mã size</p>
          <Controller
            control={control}
            name="sizeID"
            rules={{
              required: "Nhập mã size",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.sizeID ? true : false}
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
          {errors.sizeID && (
            <p className="error-message">{errors.sizeID.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Tên size</p>
          <Controller
            control={control}
            name="sizeName"
            rules={{
              required: "Nhập tên size",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.sizeName ? true : false}
                variant="filled"
                onChange={(e) => {
                  field.onChange(e);
                  handleChangeSizeName(e);
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
          {errors.sizeName && (
            <p className="error-message">{errors.sizeName.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="contained" className="btn">
        Thêm
      </Button>
    </form>
  );
};

export default SizePost;
