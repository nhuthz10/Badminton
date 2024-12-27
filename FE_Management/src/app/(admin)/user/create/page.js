"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";
import { loadingAdmin, fetchAllRoleRedux } from "@/redux-toolkit/adminSlice";
import { regex } from "@/utils";
import { handleCreateANewUserService } from "@/services/userService";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux-toolkit/userSlice";

const UserPost = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const rolesData = useSelector((state) => state.admin?.allRole);
  const dispatch = useDispatch();

  const fetchAllData = async () => {
    await dispatch(fetchAllRoleRedux());
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const onSubmit = async (dataSubmit) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleCreateANewUserService({
        email: dataSubmit.email,
        userName: dataSubmit.username,
        password: dataSubmit.password,
        phoneNumber: dataSubmit.phone,
        address: dataSubmit.address,
        roleId: dataSubmit.roleId,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm khách hàng thành công");
        setValue("username", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("address", "");
        setValue("roleId", "");
        setValue("password", "");

        router.push(`/user`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Email người dùng đã tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Số điện thoại người dùng đã tồn tại");
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
      <h1 className="model-add-update-header">Thêm người dùng</h1>
      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Tên</p>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Nhập tên người dùng",
              pattern: {
                value: regex.USERNAME,
                message: "Tên người dùng không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.username ? true : false}
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
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Email</p>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Nhập email người dùng",
              pattern: {
                value: regex.EMAIL,
                message: "Email người dùng không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.email ? true : false}
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
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Quyền hạn</p>
          <Controller
            control={control}
            name="roleId"
            rules={{
              required: "Chọn quyền hạn người dùng",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.roleId ? true : false}
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
                {rolesData &&
                  rolesData.length > 0 &&
                  rolesData.map((option) => (
                    <MenuItem
                      key={option.roleId}
                      value={option.roleId}
                      style={{
                        fontSize: "var(--text-fontSize)",
                      }}
                    >
                      {option.roleId === "R1" ? "Quản trị viên" : "Khách hàng"}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          {errors.roleId && (
            <p className="error-message">{errors.roleId.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Mật khẩu</p>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Nhập mật khẩu người dùng",
              minLength: {
                value: 8,
                message: "Tối thiểu 8 ký tự",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.password ? true : false}
                type="password"
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
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Số điện thoại</p>
          <Controller
            control={control}
            name="phone"
            rules={{
              pattern: {
                value: regex.PHONE,
                message: "Số điện thoại không hợp lệ",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.phone ? true : false}
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
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Địa chỉ</p>
          <Controller
            control={control}
            name="address"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.address ? true : false}
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
          {errors.address && (
            <p className="error-message">{errors.address.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="contained" className="btn">
        Thêm
      </Button>
    </form>
  );
};

export default UserPost;
