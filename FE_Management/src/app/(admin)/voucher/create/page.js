"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { handleCreateNewVoucher } from "@/services/productService";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { regex } from "@/utils";
import CreateCode from "@/utils/commonUtils";
import { logOut } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

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

function VoucherPost() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [imageValue, setImageValue] = useState("/images/ImgNoProduct.png");
  const [fileImage, setFileImage] = useState("");
  const [checkImage, setCheckImage] = useState(false);
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

  const onSubmit = async (submitData) => {
    if (!imageValue || !fileImage) {
      setCheckImage(true);
    } else {
      try {
        dispatch(loadingAdmin(true));
        const formData = new FormData();
        formData.append("voucherId", submitData.voucherId);
        formData.append(
          "voucherPrice",
          submitData.voucherPrice.replace(/\./g, "")
        );
        formData.append("quantity", submitData.quantity);
        formData.append("timeStart", submitData.timeStart.$d.getTime());
        formData.append("timeEnd", submitData.timeEnd.$d.getTime());
        formData.append("image", fileImage);

        let res = await handleCreateNewVoucher(formData);
        if (res && res.errCode === 0) {
          toast.success("Thêm voucher thành công");
          setValue("voucherId", "");
          setValue("voucherPrice", "");
          setValue("quantity", "");
          setValue("timeStart", "");
          setValue("timeEnd", "");

          dispatch(handleChangePage(1));
          router.push(`/voucher`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã voucher đã tồn tại");
        } else if (err?.response?.data?.errCode === -4) {
          toast.error("Phiên bản đăng nhập hết hạn");
          dispatch(logOut());
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    }
  };

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleChangePrice = (e) => {
    if (e.target.value) {
      let voucherId = CreateCode(e.target.value);
      setValue("voucherId", voucherId, { shouldValidate: true });
      const price = e.target.value.replace(/[^\d]/g, "");

      setValue("voucherPrice", currencyFormatter.format(price), {
        shouldValidate: true,
      });
    } else {
      setValue("voucherId", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Thêm voucher</h1>

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
              Tải hình ảnh voucher
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
          <p className="modal-add-update-input-label">Mã voucher</p>
          <Controller
            control={control}
            name="voucherId"
            rules={{
              required: "Nhập mã voucher",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.voucherId ? true : false}
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
          {errors.voucherId && (
            <p className="error-message-flex">{errors.voucherId?.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Thời gian bắt đầu</p>
          <Controller
            control={control}
            name="timeStart"
            rules={{
              required: "Chọn ngày bắt đầu voucher",
              validate: {
                isEndDateAfterStartDate: (value) => {
                  const endDate = getValues("timeEnd");
                  const startDate = value;

                  if (startDate && endDate) {
                    const startDateObj = new Date(startDate);
                    const endDateObj = new Date(endDate);

                    if (
                      dayjs(startDate).isAfter(dayjs(endDate)) ||
                      startDateObj.getTime() === endDateObj.getTime()
                    ) {
                      return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
                    }
                  }
                },
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="date-picker-voucher"
                    id="timeStart"
                    {...register("timeStart", {
                      required: "Chọn ngày bắt đầu voucher",
                    })}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 45,
                        fontSize: "var(--text-fontSize)",
                      },
                    }}
                    format="DD/MM/YYYY"
                    minDate={dayjs(new Date())}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ? value : null}
                  />
                </LocalizationProvider>
              );
            }}
          />
          {errors.timeStart && (
            <p className="error-message-flex">{errors.timeStart?.message}</p>
          )}
        </div>
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Thời gian kết thúc</p>
          <Controller
            control={control}
            name="timeEnd"
            rules={{
              required: "Chọn ngày kết thúc voucher",
              validate: {
                isEndDateAfterStartDate: (value) => {
                  const startDate = getValues("timeStart");
                  const endDate = value;

                  if (startDate && endDate) {
                    const startDateObj = new Date(startDate);
                    const endDateObj = new Date(endDate);

                    if (
                      dayjs(startDate).isAfter(dayjs(endDate)) ||
                      startDateObj.getTime() === endDateObj.getTime()
                    ) {
                      return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                    }
                  }
                },
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="date-picker-voucher"
                    id="timeEnd"
                    {...register("timeEnd", {
                      required: "Chọn ngày kết thúc voucher",
                    })}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 45,
                        fontSize: "var(--text-fontSize)",
                      },
                    }}
                    format="DD/MM/YYYY"
                    minDate={dayjs(new Date())}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ? value : null}
                  />
                </LocalizationProvider>
              );
            }}
          />
          {errors.timeEnd && (
            <p className="error-message-flex">{errors.timeEnd?.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Số lượng</p>
          <Controller
            control={control}
            name="quantity"
            rules={{
              required: "Nhập số lượng voucher",
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
            <p className="error-message-flex">{errors.quantity.message}</p>
          )}
        </div>
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Giá (VND)</p>
          <Controller
            control={control}
            name="voucherPrice"
            rules={{
              required: "Nhập giá voucher",
              pattern: {
                value: regex.PRICE,
                message: "Giá không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.voucherPrice ? true : false}
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
          {errors.voucherPrice && (
            <p className="error-message-flex">{errors.voucherPrice.message}</p>
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
}

export default VoucherPost;
