"use client";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleDeleteBlogService } from "@/services/blogService";
import { fetchAllBlogRedux } from "@/redux-toolkit/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import { LIMIT } from "@/utils";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import GridData from "@/components/GridData/GridData";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";

const BlogAdmin = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector((state) => state.admin.allUser?.totalPage);

  const handleDeleteBlog = async (blog, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteBlogService(blog.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllBlogRedux({
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa bài viết thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Bài viết không tồn tại");
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

  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: {
        borderTopLeftRadius: 15,
        paddingLeft: "1rem",
        BorderLeft: "none",
      },
    },
    { label: "TIÊU ĐỀ", key: "title" },
    { label: "TÁC GIẢ", key: "UserBlogData.userName" },
    { label: "TRẠNG THÁI", key: "isPublished" },
    {
      label: "",
      key: "",
      style: { borderTopRightRadius: 15, borderRight: "none" },
    },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteBlog}
      headerString="Quản lý bài viết"
      gridType="blog"
    />
  );
};

export default BlogAdmin;
