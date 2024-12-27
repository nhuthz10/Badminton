"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
  fetchAllBrandRedux,
  fetchAllProductTypeRedux,
  loadingAdmin,
} from "@/redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetProductDetailService,
  handleUpdateProductService,
} from "@/services/productService";
import { regex } from "@/utils";
import CreateCode from "@/utils/commonUtils";
import Image from "next/image";
import { logOut } from "@/redux-toolkit/userSlice";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductPost = ({ params }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [data, setData] = useState({});
  const productTypeData = useSelector(
    (state) => state.admin?.allProductType?.data
  );
  const brandData = useSelector((state) => state.admin?.allBrand?.data);
  const [imageValue, setImageValue] = useState("/images/ImgNoProduct.png");
  const [fileImage, setFileImage] = useState("");
  const [checkImage, setCheckImage] = useState(false);
  const [desContent, setDesContent] = useState("");
  const [desHTML, setDesHTML] = useState("");
  const dispatch = useDispatch();

  const handleChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let objUrl = URL.createObjectURL(file);
      setFileImage(file);
      setImageValue(objUrl);
      setCheckImage(false);
    } else {
      setFileImage("");
      setImageValue("/images/ImgNoProduct.png");
      setCheckImage(true);
    }
  };

  const fetchAllData = async () => {
    await dispatch(
      fetchAllBrandRedux({
        pagination: false,
      })
    );
    await dispatch(
      fetchAllProductTypeRedux({
        pagination: false,
      })
    );
  };

  const fetchProductDetail = async () => {
    try {
      dispatch(loadingAdmin(false));
      let res = await handleGetProductDetailService(params.id);
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
    fetchProductDetail();
    fetchAllData();
  }, []);

  useEffect(() => {
    if (data) {
      setValue("productID", data.productId);
      setValue("brandID", data.brandData?.brandId);
      setValue("productType", data.productTypeData?.productTypeId);
      setValue("productName", data.name);
      setValue("price", currencyFormatter.format(data.price));
      setValue("discount", data.discount);
      setImageValue(data.image);
      if (data.descriptionContent === "null") {
        setDesContent("");
        setDesHTML("");
      } else {
        setDesContent(data.descriptionContent);
        setDesHTML(data.descriptionHTML);
      }
    }
  }, [data, setValue]);

  const onSubmit = async (submitData) => {
    try {
      dispatch(loadingAdmin(true));
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("image", fileImage);
      formData.append("productId", submitData.productID);
      formData.append("brandId", submitData.brandID);
      formData.append("productTypeId", submitData.productType);
      formData.append("name", submitData.productName);
      formData.append("price", submitData.price.replace(/\./g, ""));
      formData.append("discount", submitData.discount);
      formData.append("descriptionContent", desContent);
      formData.append("descriptionHTML", desHTML);

      let res = await handleUpdateProductService(formData);

      if (res && res.errCode === 0) {
        toast.success("Cập nhật sản phẩm thành thành công");
        setValue("productID", "");
        setValue("brandID", "");
        setValue("productType", "");
        setValue("productName", "");
        setValue("description", "");
        setValue("discount", "");
        setValue("price", "");
        setDesContent("");
        setDesHTML("");
        setImageValue("/images/ImgNoProduct.png");
        setFileImage("");

        router.push("/product");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã sản phẩm đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Tên sản phẩm đã tồn tại");
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Sản phẩm không tồn tại");
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

  const handleChangeMarkdown = ({ html, text }) => {
    setDesContent(text);
    setDesHTML(html);
  };

  const handleChangeProductName = (e) => {
    if (e.target.value) {
      let productID = CreateCode(e.target.value);
      setValue("productID", productID, { shouldValidate: true });
    } else {
      setValue("productID", "", { shouldValidate: false });
    }
  };

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleChangePrice = (e) => {
    if (e.target.value) {
      const price = e.target.value.replace(/[^\d]/g, "");
      setValue("price", currencyFormatter.format(price), {
        shouldValidate: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Sửa thông tin sản phẩm</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: 260,
          }}
        >
          <Image
            src={imageValue}
            alt=""
            height={230}
            width={180}
            style={{
              height: 230,
              width: 180,
              objectFit: "containt",
              borderRadius: 10,
              border: "1px solid gray",
            }}
          ></Image>
          {checkImage && (
            <p
              style={{
                color: "red",
                fontSize: "var(--small-fontSize)",
                marginTop: "1rem",
              }}
            >
              Tải hình ảnh sản phẩm
            </p>
          )}
        </div>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            height: "4rem",
          }}
        >
          Tải ảnh lên
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleChangeImage(e)}
          />
        </Button>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Mã sản phẩm</p>
          <Controller
            control={control}
            name="productID"
            rules={{
              required: "Nhập mã sản phẩm",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.productID ? true : false}
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                variant="filled"
                size="small"
                hiddenLabel
                className="modal-add-update-input-text-field"
              />
            )}
          />
          {errors.productID && (
            <p className="error-message-flex">{errors.productID.message}</p>
          )}
        </div>
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Loại sản phẩm</p>
          <Controller
            control={control}
            name="productType"
            rules={{
              required: "Chọn loại sản phẩm",
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
                className="modal-add-update-input-text-field"
                SelectProps={{
                  IconComponent: () => (
                    <ArrowDropDownIcon
                      style={{
                        fontSize: "3.5rem",
                      }}
                    />
                  ),
                }}
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
            <p className="error-message-flex">{errors.productType.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Thương hiệu</p>
          <Controller
            control={control}
            name="brandID"
            rules={{
              required: "Chọn thương hiệu",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.brandID ? true : false}
                select
                variant="filled"
                hiddenLabel
                className="modal-add-update-input-text-field"
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
              >
                {brandData &&
                  brandData.length > 0 &&
                  brandData.map((option) => (
                    <MenuItem
                      key={option.brandId}
                      value={option.brandId}
                      style={{
                        fontSize: "var(--text-fontSize)",
                      }}
                    >
                      {option.brandName}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          {errors.brandID && (
            <p className="error-message">{errors.brandID.message}</p>
          )}
        </div>
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Giá (VND)</p>
          <Controller
            control={control}
            name="price"
            rules={{
              required: "Nhập giá sản phẩm",
              pattern: {
                value: regex.PRICE,
                message: "Giá không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.price ? true : false}
                variant="filled"
                hiddenLabel
                onChange={(e) => {
                  field.onChange(e);
                  handleChangePrice(e);
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
          {errors.price && (
            <p className="error-message-flex">{errors.price.message}</p>
          )}
        </div>
      </div>

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
                hiddenLabel
                onChange={(e) => {
                  field.onChange(e);
                  handleChangeProductName(e);
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
          {errors.productName && (
            <p className="error-message">{errors.productName.message}</p>
          )}
        </div>
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Giảm giá (%)</p>
          <Controller
            control={control}
            name="discount"
            rules={{
              pattern: {
                value: regex.DISCOUNT,
                message: "Giảm giá không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.discount ? true : false}
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
          {errors.discount && (
            <p className="error-message">{errors.discount.message}</p>
          )}
        </div>
      </div>

      <div>
        <p className="modal-add-update-input-label">Mô tả</p>
        <MdEditor
          style={{
            width: "100%",
            height: "500px",
            fontSize: "var(--text-fontSize)",
            marginTop: "15px",
          }}
          renderHTML={(text) => mdParser.render(text)}
          value={desContent}
          onChange={handleChangeMarkdown}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        className="btn"
        style={{ margin: "30px 0" }}
      >
        Cập nhật
      </Button>
    </form>
  );
};

export default ProductPost;