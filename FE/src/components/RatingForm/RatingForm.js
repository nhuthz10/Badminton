"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import "./RattingForm.scss";
import { handleCreateFeedbackService } from "../../services/productService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logOut } from "@/redux-toolkit/userSlice";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: 10,
  padding: 20,
};

const RattingForm = ({
  productData,
  setIsOpen,
  isOpen,
  getAllProductFeedBack,
}) => {
  const [rating, setRating] = useState(0);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo.id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setValue("comment", "");
    setRating(0);
    setIsOpen(false);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const submitCommentAndRating = async (submitData) => {
    if (isLogin) {
      try {
        let res = await handleCreateFeedbackService({
          productId: productData.productId,
          userId: userId,
          description: submitData.comment,
          rating: rating,
          orderId: productData.orderId,
          sizeId: productData.sizeId,
        });
        if (res && res.errCode === 0) {
          setValue("comment", "");
          setRating(0);
          setIsOpen(false);
          getAllProductFeedBack();
          toast.success("Đánh giá sản phầm thành công", {
            className: "toast-normal",
          });
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.errCode === -4) {
          toast.error("Phiên bản đăng nhập hết hạn", {
            className: "toast-normal",
          });
          dispatch(logOut());
        } else {
          toast.error(error?.response?.data?.message, {
            className: "toast-normal",
          });
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập", {
        className: "toast-normal",
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="rating-form-container" style={{ ...style }}>
        <div
          style={{
            fontSize: "var(--title-fontSize)",
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Đánh giá sản phẩm
        </div>
        <form
          className="comment-rating-form"
          onSubmit={handleSubmit(submitCommentAndRating)}
        >
          <Rating
            name="product-rating"
            value={rating}
            defaultValue={0}
            precision={0.5}
            className="comment-rating"
            onChange={handleRatingChange}
          />
          <div className="input-wrap-comment">
            <textarea
              className="comment-content"
              {...register("comment", {
                required: "Nhập phản hồi của bạn",
              })}
              placeholder="Viết phản hồi..."
            ></textarea>
            {errors.comment && (
              <p
                style={{
                  color: "#bf1650",
                  fontSize: "var(--text-fontSize)",
                  marginTop: 6,
                }}
              >
                {errors.comment.message}
              </p>
            )}
          </div>

          <div className="ctn_send_btn">
            <button className="contain_send_btn" type="submit">
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RattingForm;
