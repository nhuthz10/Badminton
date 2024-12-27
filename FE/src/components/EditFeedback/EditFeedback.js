import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./EditFeedback.scss";
import { handleUpdateFeedbackService } from "../../services/productService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { logOut } from "@/redux-toolkit/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: 10,
  padding: 20,
};

const EditFeedback = ({ data, setIsOpen, getAllDataFeedback, isOpen }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo?.id);

  useEffect(() => {
    if (data) {
      setComment(data.description);
      setRating(data.rating);
    }
  }, [data]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const submitCommentAndRating = async () => {
    if (isLogin) {
      try {
        let res = await handleUpdateFeedbackService({
          userId: userId,
          feedbackId: data.id,
          description: comment,
          rating: rating,
        });
        if (res && res.errCode === 0) {
          setComment("");
          setRating(0);
          setIsOpen(false);
          getAllDataFeedback();
          toast.success("Chỉnh sửa đánh giá sản phầm thành công", {
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
      <div className="edit-feedback-container" style={{ ...style }}>
        <div
          style={{
            fontSize: "var(--title-fontSize)",
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Đánh giá sản phẩm
        </div>
        <div className="edit-feedback-form">
          <Rating
            name="product-rating"
            value={rating}
            defaultValue={0}
            precision={0.5}
            className="comment-rating"
            onChange={handleRatingChange}
          />
          <textarea
            className="coment-content"
            onChange={handleCommentChange}
            value={comment}
            placeholder="Viết phản hồi..."
          ></textarea>

          <div className="ctn_send_btn">
            <button
              className="contain_send_btn"
              onClick={submitCommentAndRating}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditFeedback;
