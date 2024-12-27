"use client";
import { handleGetBlogService } from "@/services/blogService";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadingProduct } from "@/redux-toolkit/productSlice";
import "./page.scss";

const BlogDetail = ({ params }) => {
  const [blogData, setBlogData] = useState({});
  const dispatch = useDispatch();
  const parts = params.blogId.split("-");
  const blogId = parts[parts.length - 1].toUpperCase();

  const handleGetBlogData = async () => {
    try {
      dispatch(loadingProduct(true));
      let res = await handleGetBlogService(blogId);
      if (res && res.errCode === 0) {
        setBlogData(res?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        logOut();
      } else if (error?.response?.data?.errCode === 4) {
        toast.error("Bài viết không tồn tại", { className: "toast-normal" });
      } else {
        toast.error(error?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    handleGetBlogData();
  }, [blogId]);

  return (
    <div className="blog-detail-container">
      <h1 className="blog-title">{blogData.title}</h1>
      <p className="blog-description">{blogData.description}</p>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: blogData?.contentHTML,
        }}
      ></div>
    </div>
  );
};

export default BlogDetail;
