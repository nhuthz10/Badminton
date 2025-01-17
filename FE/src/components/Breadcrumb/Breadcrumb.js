"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  handleGetAllProductTypeService,
  handleGetProductName,
} from "../../services/productService";
import { handleGetBlogService } from "@/services/blogService";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import { useDispatch } from "react-redux";
import "./Breadcrumb.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { handleFilterProduct } from "../../redux-toolkit/productSlice";
import { logOut } from "@/redux-toolkit/userSlice";

const convertSlugToId = (str) => {
  const words = str.split("-");
  const lastWord = words[words.length - 1];
  return lastWord;
};

function Breadcrumb() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [productTypes, setProductTypes] = useState([]);
  const [productName, setProductName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");

  let currentLink = "";
  const crumbs = pathname.split("/");
  let name = crumbs.find((crumb) => crumb === "product" || crumb === "user");
  let checkHome = false;
  let searchText = useSelector((state) => state.search.searchText);

  useEffect(() => {
    let getAllProductType = async () => {
      try {
        let res = await handleGetAllProductTypeService("", "", "", false);
        if (res && res.errCode === 0) {
          setProductTypes(res?.data);
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
    };
    getAllProductType();
  }, []);

  useEffect(() => {
    let getProductName = async (productId) => {
      let res = await handleGetProductName(productId);
      if (res && res.errCode === 0) {
        setProductName(res?.data?.name);
      }
    };
    if (crumbs[2] && crumbs[1] !== "user") {
      const id = convertSlugToId(crumbs[2]);
      getProductName(id);
    }
  }, [crumbs]);

  useEffect(() => {
    let getblogTitle = async (blogId) => {
      let res = await handleGetBlogService(blogId);
      if (res && res.errCode === 0) {
        setBlogTitle(res?.data?.title);
      }
    };
    if (crumbs[2] && crumbs[1] === "tin-tuc") {
      const id = convertSlugToId(crumbs[2]);
      getblogTitle(id);
    }
  }, [crumbs]);

  const handleClickCrumb = () => {
    dispatch(handleChangePage(1));
    dispatch(handleFilterProduct({ brandId: [], price: [0, 10000000] }));
  };

  const displayCrumbs = crumbs.map((crumb, index) => {
    if (crumb === name) return null;
    if (crumb === "" && !checkHome) {
      checkHome = true;
      crumb = "Trang chủ";
      currentLink = "/";
    } else {
      if (crumb === "") return null;
      if (crumb === crumbs[1]) {
        currentLink = `/${crumb}`;
        if (
          crumb !== "user" &&
          crumb !== "sale-off" &&
          crumb !== "search" &&
          crumb !== "tin-tuc"
        ) {
          crumb = convertSlugToId(crumb.toUpperCase());
        }
      }
      if (crumb === crumbs[2]) {
        currentLink = `/${crumbs[1]}/${crumb}`;
        if (crumb !== "user") {
          crumb = productName ? productName : crumb;
          crumb = blogTitle ? blogTitle : crumb;
        }
      }
      if (crumb === "sale-off") crumb = "Sale Off";
      else if (crumb === "search") crumb = `Tìm kiếm [${searchText}]`;
      else if (crumb === "cart") crumb = "Giỏ hàng";
      else if (crumb === "profile") crumb = "Thông tin người dùng";
      else if (crumb === "orders") crumb = "Lịch sử đơn hàng";
      else if (crumb === "feedback") crumb = "Đánh giá sản phẩm";
      else if (crumb === "favourite") crumb = "Sản phẩm yêu thích";
      else if (crumb === "tin-tuc") crumb = "Tin tức";
    }
    productTypes.forEach((productType) => {
      if (productType.productTypeId === crumb) {
        crumb = productType.productTypeName;
      }
    });

    return (
      <div
        key={index}
        style={{ display: "flex", lineHeight: 1.4, alignItems: "center" }}
      >
        <Link className="text" href={currentLink} onClick={handleClickCrumb}>
          <span>{crumb}</span>
        </Link>
        {index !== crumbs.length - 1 && (
          <FontAwesomeIcon className="text" icon={faAngleRight} />
        )}
      </div>
    );
  });

  return <div className="breadcrum-container">{displayCrumbs}</div>;
}

export default Breadcrumb;
