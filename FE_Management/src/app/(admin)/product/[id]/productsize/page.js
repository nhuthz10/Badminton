"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductSizeRedux,
  loadingAdmin,
} from "@/redux-toolkit/adminSlice";
import {
  handleDeleteProductSizeService,
  handleGetProductDetailService,
} from "@/services/productService";
import GridData from "@/components/GridData/GridData";
import { LIMIT } from "@/utils";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";
import { usePathname } from "next/navigation";

const ProductSizeAdmin = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const path = pathname.split("/");
  const productId = path[2];
  const [data, setData] = useState({});
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector(
    (state) => state.admin.allProductSize?.totalPage
  );

  const handleDeleteProductSize = async (productSize, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteProductSizeService(productSize.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllProductSizeRedux({
            productId: data.productId,
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa kích cỡ sản phẩm thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Kích cỡ sản phẩm không tồn tại");
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

  const fetchProductDetail = async () => {
    try {
      dispatch(loadingAdmin(false));
      let res = await handleGetProductDetailService(productId);
      if (res && res.errCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else if (error?.response?.data?.errCode === 2) {
        toast.error("Sản phẩm không tồn tại");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

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
    { label: "TÊN SẢN PHẨM", key: "ProductSizeData" },
    { label: "KÍCH CỠ", key: "SizeData" },
    { label: "SỐ LƯỢNG", key: "quantity" },
    {
      label: "",
      key: "",
      style: { borderTopRightRadius: 15, borderRight: "none" },
    },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteProductSize}
      product={{
        id: productId,
        productId: data.productId,
      }}
      headerString="Kích cỡ theo sản phẩm"
      gridType="productSize"
    />
  );
};

export default ProductSizeAdmin;
