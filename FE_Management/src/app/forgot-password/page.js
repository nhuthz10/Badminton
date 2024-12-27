"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSendOptService } from "../../services/userService";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading/Loading";
import Image from "next/image";
import "./page.scss";
import { logOut } from "@/redux-toolkit/userSlice";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let handleSendOpt = async (data) => {
    setIsLoading(true);
    try {
      let res = await handleSendOptService(data.email);
      if (res && res.errCode === 0) {
        toast.success("Mã OPT đã được gửi thành công");
        router.push(`/change-password/${data.email}`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Email của bạn không tồn tại");
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
      <div className="forgot-password-container">
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

        <div className="forgot-password-content">
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
              <div className="forgot-password-form-container">
                <h1 className="forgot-password-title">Quên mật khẩu</h1>
                <div className="forgot-password-form">
                  <div style={{ height: "9rem" }}>
                    <div className="forgot-password-email">
                      <FontAwesomeIcon
                        className="forgot-password-email-icon"
                        icon={faEnvelope}
                      />
                      <input
                        className="forgot-password-email-input"
                        placeholder="Email"
                        {...register("email", {
                          required: "Nhập email của bạn",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ",
                          },
                        })}
                      ></input>
                    </div>
                    {errors.email && (
                      <p className="errer">{errors.email.message}</p>
                    )}
                  </div>
                  <button
                    className="forgot-password-send"
                    onClick={handleSubmit(handleSendOpt)}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ForgotPassword;
