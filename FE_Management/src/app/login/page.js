"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleLoginService } from "../../services/userService";
import { logIn, logOut } from "../../redux-toolkit/userSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading/Loading";
import Link from "next/link";
import { path } from "../../utils";
import { handleGetUserAfterLoginService } from "../../services/userService";
import { regex } from "../../utils";
import "./page.scss";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
        localStorage.setItem("access_token", res?.access_token);
        localStorage.setItem("refresh_token", res?.refresh_token);
        const decoded = jwtDecode(res?.access_token);
        if (decoded?.id) {
          let useInfor = await handleGetUserAfterLoginService(decoded?.id);
          if (useInfor?.errCode === 0) {
            dispatch(logIn(useInfor?.user));
            toast.success("Đăng nhập thành công");
            router.push("/");
          }
        }
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 4) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loading loading={isLoading}>
      <div className="login-container">
        <div className="bg-gradient">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/images/bg-gradient.png"
            alt="background"
            className="fullImg"
          />
        </div>

        <div className="login-content">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            priority
            src="/images/coming-soon-object1.png"
            alt="object1"
            className="object1"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            priority
            src="/images/coming-soon-object2.png"
            alt="object2"
            className="object2"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/images/coming-soon-object3.png"
            alt="object3"
            className="object3"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/images/polygon-object.svg"
            alt="polygon"
            className="polygon"
          />

          <div className="content">
            <div className="inner">
              <div className="formContainer">
                <h1 className="title">Đăng nhập</h1>
                <p className="subtitle">
                  Nhập email và mật khẩu của bạn để đăng nhập
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="formContent">
                  <div className="formGroup">
                    <label
                      htmlFor="email"
                      style={{
                        color: "rgb(71 76 90)",
                        fontSize: "var(--title-small-fontSize)",
                        fontWeight: 500,
                        marginBottom: 8,
                      }}
                    >
                      Email
                    </label>
                    <div className="inputContainer">
                      <input
                        id="email"
                        placeholder="Nhập email"
                        className="input-email"
                        name="email"
                        {...register("email", {
                          required: "Nhập email của bạn",
                          pattern: {
                            value: regex.EMAIL,
                            message: "Email không hợp lệ",
                          },
                        })}
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="input-icon"
                      ></FontAwesomeIcon>
                    </div>
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>

                  <div className="formGroup">
                    <label
                      htmlFor="password"
                      style={{
                        color: "rgb(71 76 90)",
                        fontSize: "var(--title-small-fontSize)",
                        fontWeight: 500,
                        marginBottom: 8,
                      }}
                    >
                      Mật khẩu
                    </label>
                    <div className="inputContainer">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Nhập mật khẩu"
                        className="input-password"
                        {...register("password", {
                          required: "Nhập mật khẩu của bạn",
                        })}
                      />
                      <FontAwesomeIcon
                        icon={faLock}
                        className="input-icon"
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="show-password-icon"
                        onClick={handleShowPassword}
                      ></FontAwesomeIcon>
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>

                  <Link href={path.FORGOT_PASSWORD} className="forgot-password">
                    Quên mật khẩu
                  </Link>

                  <button type="submit" className="submitButton">
                    Đăng nhập
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default LoginPage;
