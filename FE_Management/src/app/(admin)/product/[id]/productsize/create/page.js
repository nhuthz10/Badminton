"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import {
  fetchAllProductSizeOfTheProductTypeRedux,
  loadingAdmin,
} from "@/redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCreateProductSizeService,
  handleGetProductDetailService,
} from "@/services/productService";
import { regex } from "@/utils";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const ProductSizePost = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/");
  const productId = path[2];
  const [data, setData] = useState({});
  const sizeProductTypes = useSelector(
    (state) => state.admin.allProductSizeOfTheProductType
  );
  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    try {
      dispatch(loadingAdmin(false));
      let res = await handleGetProductDetailService(productId);
      if (res && res.errCode === 0) {
        setData(res.data);
        await dispatch(
          fetchAllProductSizeOfTheProductTypeRedux(
            res.data?.productTypeData?.productTypeId
          )
        );
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
    fetchProductDetail();
  }, []);

  useEffect(() => {
    if (data) {
      setValue("productName", data?.name);
      setValue("sizeId", data?.SizeData?.sizeId);
      setValue("quantity", data?.quantity);
    }
  }, [data]);

  const onSubmit = async (submitData) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleCreateProductSizeService({
        sizeId: submitData.sizeId,
        productId: data.productId,
        quantity: submitData.quantity,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm kích cõ sản phẩm thành công");
        setValue("sizeId", "");
        setValue("quantity", "");

        dispatch(handleChangePage(1));
        router.push(`/product/${productId}/productsize/`);
      }
    } catch (err) {
      if (err.response.data.errCode === 2) {
        toast.error("Kích cỡ sản phẩm đã tồn tại");
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
      <h1 className="model-add-update-header">Thêm kích cỡ sản phẩm</h1>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Tên sản phẩm</p>
          <Controller
            control={control}
            name="productName"
            rules={{
              required: "Nhập tên sản phẩm",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.productName ? true : false}
                variant="filled"
                disabled
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
          {errors.productName && (
            <p className="error-message">{errors.productName.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Kích cỡ</p>
          <Controller
            control={control}
            name="sizeId"
            rules={{
              required: "Chọn loại sản phẩm",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.sizeId ? true : false}
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
                {sizeProductTypes &&
                  sizeProductTypes.length > 0 &&
                  sizeProductTypes.map((option) => (
                    <MenuItem
                      key={option.sizeId}
                      value={option.sizeId}
                      style={{
                        fontSize: "var(--text-fontSize)",
                      }}
                    >
                      {option.sizeName}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          {errors.sizeId && (
            <p className="error-message">{errors.sizeId.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Số lượng sản phẩm</p>
          <Controller
            control={control}
            name="quantity"
            rules={{
              required: "Nhập số lượng sản phẩm",
              pattern: {
                value: regex.QUANTITY,
                message: "Số lượng không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.quantity ? true : false}
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
          {errors.quantity && (
            <p className="error-message">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="contained"
        className="btn"
        style={{ margin: "30px 0" }}
      >
        Thêm
      </Button>
    </form>
  );
};

export default ProductSizePost;
