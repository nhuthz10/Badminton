"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  logIn,
  updateFavourites,
  updateCartId,
  logOut,
} from "../../redux-toolkit/userSlice";
import Image from "next/image";
import { handleLoginService } from "../../services/userService";
import { handleCreatCartService } from "../../services/cartService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading/Loading";
import { path } from "../../utils";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleGetUserAfterLoginService } from "../../services/userService";
import "./page.scss";
import { regex } from "../../utils";
import { setPersistStorage } from "@/redux-toolkit/store";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaveLogin, setIsSaveLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let res = await handleLoginService(data.email, data.password);
      if (res && res.errCode === 0) {
        setPersistStorage(!isSaveLogin);
        const storage = isSaveLogin ? localStorage : sessionStorage;
        localStorage.setItem("isSaveLogin", isSaveLogin ? "true" : "false");
        storage.setItem("access_token", res?.access_token);
        storage.setItem("refresh_token", res?.refresh_token);

        const decoded = jwtDecode(res?.access_token);
        if (decoded?.id) {
          let useInfor = await handleGetUserAfterLoginService(decoded?.id);
          if (useInfor?.errCode === 0) {
            dispatch(logIn(useInfor?.user));
            dispatch(updateFavourites(useInfor?.favourites));
            let cartId = await handleCreatCartService({
              userId: useInfor?.user?.id,
            });
            dispatch(updateCartId(cartId?.data));
            toast.success("Đăng nhập thành công", {
              className: "toast-normal",
            });
            router.push("/");
          }
        }
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 4) {
        toast.error("Email hoặc mật khẩu không chính xác", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Email hoặc mật khẩu không chính xác", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Email hoặc mật khẩu không chính xác", {
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
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loading loading={isLoading}>
      <div className="login-container">
        <div className="login-content">
          <div className="login-content-left">
            <Image
              src="/images/loginImage.png"
              width={0}
              height={0}
              className="login-content-img"
              sizes="100vw"
              alt="img"
            />
          </div>
          <div className="login-content-right">
            <Link href="/" className="logo-wrapper">
              <Image
                src="/images/logo.png"
                width={35}
                height={60}
                alt="logo-img"
              ></Image>
              <h1 className="logo-name">BAMITO</h1>
            </Link>
            <h1 className="login-greeting">XIN CHÀO BẠN 👋</h1>
            <p style={{ fontSize: "var(--text-fontSize)" }}>
              Nhập email và mật khẩu của bạn để trải nghiệm Bamito nhé
            </p>

            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="login-form">
                <div className="form-input-wrapper">
                  <label className="form-lable">Email</label>
                  <div className="form-input">
                    <input
                      style={{ fontSize: "var(--text-fontSize)" }}
                      type="text"
                      autoComplete="username"
                      {...register("email", {
                        required: "Nhập email của bạn",
                        pattern: {
                          value: regex.EMAIL,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                  </div>
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="form-input-wrapper">
                  <label className="form-lable">Mật khẩu</label>
                  <div
                    className="form-input"
                    style={{
                      position: "relative",
                    }}
                  >
                    <input
                      style={{
                        fontSize: "var(--text-fontSize)",
                        paddingRight: 18,
                      }}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Nhập mật khẩu của bạn",
                        minLength: {
                          value: 8,
                          message: "Tối thiểu 8 ký tự",
                        },
                      })}
                    />
                    <button
                      type="button"
                      style={{
                        fontSize: "var(--text-fontSize)",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: 6,
                      }}
                      onClick={handleShowPassword}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        style={{ opacity: "0.5 " }}
                      />
                    </button>
                  </div>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>

              <div className="login-actions">
                <button
                  type="button"
                  className="check-save-btn-wrapper"
                  onClick={() => {
                    setIsSaveLogin(!isSaveLogin);
                  }}
                >
                  <div className="check-save-btn">
                    {isSaveLogin && <FontAwesomeIcon icon={faCheck} />}
                  </div>
                  <span>Lưu đăng nhập</span>
                </button>
                <Link
                  href={path.FORGOT_PASSWORD}
                  type="button"
                  className="forgot-password-btn"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="login-auth-buttons">
                <button type="submit" className="login-button">
                  Đăng nhập
                </button>
                <Link href="/register" className="register-button">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default Login;
