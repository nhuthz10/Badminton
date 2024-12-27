"use client";
import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./ModalChangePassword.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { handleChangePasswordProfile } from "../../services/userService";
import { toast } from "react-toastify";
import { logOut } from "@/redux-toolkit/userSlice";
import { loadingProduct } from "@/redux-toolkit/productSlice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: 15,
  padding: "25px 20px 25px 20px",
};

const ModalChangePassword = ({ open, handleCloseModal, setIsOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const userId = useSelector((state) => state.user?.userInfo?.id);

  const handleChangePassword = async (data) => {
    try {
      dispatch(loadingProduct(true));
      let res = await handleChangePasswordProfile({
        id: userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (res && res.errCode === 0) {
        toast.success("Thay đổi mật khẩu thành công", {
          className: "toast-normal",
        });
        setValue("currentPassword", "");
        setValue("newPassword", "");
        setValue("comfirmPassword", "");
        setIsOpen(false);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 1) {
        toast.error("Thiếu tham số bắt buộc", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Người dùng không tồn tại", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Mật khẩu hiện tại không đúng", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Mật khẩu mới trùng với mật khẩu hiện tại của bạn", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className="modal-change-password-container" style={{ ...style }}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="modal-close-icon"
          onClick={handleCloseModal}
        ></FontAwesomeIcon>

        <h3
          style={{
            fontSize: "var(--title-fontSize)",
            marginTop: 4,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Thay đổi mật khẩu
        </h3>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="form-update-password"
        >
          <div className="change-password-wrap-input">
            <p>Nhập mật khẩu hiện tại</p>
            <input
              className="change-password-input"
              type="password"
              {...register("currentPassword", {
                required: "Nhập mật khẩu hiện tại của bạn",
              })}
            />
            {errors.currentPassword && (
              <p className="error">{errors.currentPassword.message}</p>
            )}
          </div>
          <div className="change-password-wrap-input">
            <p>Nhập mật khẩu mới</p>
            <input
              className="change-password-input"
              type="password"
              {...register("newPassword", {
                required: "Nhập mật khẩu mới của bạn",
                minLength: {
                  value: 8,
                  message: "Tối thiểu 8 ký tự",
                },
              })}
            />
            {errors.newPassword && (
              <p className="error">{errors.newPassword.message}</p>
            )}
          </div>
          <div className="change-password-wrap-input">
            <p>Nhập lại mật khẩu mới</p>
            <input
              className="change-password-input"
              type="password"
              {...register("comfirmPassword", {
                required: "Nhập lại mật khẩu mới của bạn",
                validate: {
                  isCheckPass: (value) => {
                    if (getValues("newPassword") !== value) {
                      return "Mật khẩu không trùng khớp";
                    }
                  },
                },
              })}
            />
            {errors.comfirmPassword && (
              <p className="error">{errors.comfirmPassword.message}</p>
            )}
          </div>
          <button type="submit" className="btn-update-password">
            Cập nhật
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalChangePassword;
