"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchAllUserRedux,
  fetchAllBrandRedux,
  fetchAllProductTypeRedux,
  fetchAllSizeRedux,
  fetchAllProductRedux,
  fetchAllProductSizeRedux,
  fetchAllProductSizeFRedux,
  fetchAllVoucherRedux,
  fetchAllOrderAdminRedux,
  fetchAllProductOrderRedux,
  fetchAllBlogRedux,
  fetchAllRoleRedux,
} from "../../redux-toolkit/adminSlice";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { LIMIT } from "../../utils";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import "./Pagination.scss";

function PaginatedItems({ type, productId, orderStatus }) {
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(1);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const currentPage = useSelector((state) => state.pagination.page);
  const totalPageUser = useSelector((state) => state.admin.allUser.totalPage);
  const totalPageBrand = useSelector((state) => state.admin.allBrand.totalPage);
  const totalPageBlog = useSelector((state) => state.admin.allBlog.totalPage);
  const totalPageProductType = useSelector(
    (state) => state.admin.allProductType.totalPage
  );
  const pageCount = useSelector((state) => state.pagination.page);
  const totalPageSize = useSelector((state) => state.admin.allSize.totalPage);
  const totalProduct = useSelector((state) => state.admin.allProduct.totalPage);
  const totalProductSize = useSelector(
    (state) => state.admin.allProductSize.totalPage
  );
  const totalVoucher = useSelector((state) => state.admin.allVoucher.totalPage);
  const totalOrderAdmin = useSelector(
    (state) => state.admin.allOrder.totalPage
  );

  const totalProductOrder = useSelector(
    (state) => state.admin.allProductOrder.totalPage
  );
  const productData = useSelector((state) => state.admin.productData);
  const timeReport = useSelector((state) => state.admin.timeReport);
  const searchProductAdmin = useSelector(
    (state) => state.admin.searchTextProductAdmin
  );

  useEffect(() => {
    if (type === "user") {
      let getAllDataUser = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(fetchAllUserRedux({ limit: LIMIT, page: pageCount }));
        await dispatch(fetchAllRoleRedux());
        dispatch(loadingAdmin(false));
      };
      getAllDataUser();
    } else if (type === "product-brand") {
      let getAllDataBrand = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllBrandRedux({
            limit: LIMIT,
            page: pageCount,
            pagination: true,
          })
        );
        dispatch(loadingAdmin(false));
      };
      getAllDataBrand();
    } else if (type === "product-type") {
      let getAllDataProductType = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductTypeRedux({
            limit: LIMIT,
            page: pageCount,
            pagination: true,
          })
        );

        dispatch(loadingAdmin(false));
      };
      getAllDataProductType();
    } else if (type === "product-size") {
      let getAllDataSize = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(fetchAllSizeRedux({ limit: LIMIT, page: pageCount }));
        await dispatch(
          fetchAllProductTypeRedux({
            pagination: false,
          })
        );

        dispatch(loadingAdmin(false));
      };
      getAllDataSize();
    } else if (type === "product") {
      let getAllDataProduct = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductRedux({
            limit: LIMIT,
            page: pageCount,
            name: searchProductAdmin,
          })
        );
        await dispatch(
          fetchAllBrandRedux({
            pagination: false,
          })
        );
        await dispatch(
          fetchAllProductTypeRedux({
            pagination: false,
          })
        );

        dispatch(loadingAdmin(false));
      };
      getAllDataProduct();
    } else if (type === "productSize") {
      let getAllDataProductSize = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductSizeRedux({
            productId: productId,
            limit: LIMIT,
            page: pageCount,
          })
        );
        await dispatch(
          fetchAllProductSizeFRedux({
            productId: productId,
          })
        );
        dispatch(loadingAdmin(false));
      };
      getAllDataProductSize();
    } else if (type === "voucher") {
      let getAllDataVoucher = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllVoucherRedux({
            limit: LIMIT,
            page: pageCount,
            pagination: true,
          })
        );
        dispatch(loadingAdmin(false));
      };
      getAllDataVoucher();
    } else if (type === "order-admin") {
      let getAllOrder = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllOrderAdminRedux({
            limit: LIMIT,
            page: pageCount,
            status: orderStatus,
          })
        );

        dispatch(loadingAdmin(false));
      };
      getAllOrder();
    } else if (type === "report-admin") {
      let getAllProduct = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductOrderRedux({
            limit: LIMIT,
            page: pageCount,
            timeStart: timeReport.timeStart,
            timeEnd: timeReport.timeEnd,
          })
        );

        dispatch(loadingAdmin(false));
      };
      getAllProduct();
    } else if (type === "blog") {
      let getAllDataBlog = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllBlogRedux({
            limit: LIMIT,
            page: pageCount,
          })
        );
        dispatch(loadingAdmin(false));
      };
      getAllDataBlog();
    }
  }, [
    type,
    dispatch,
    pageCount,
    productId,
    orderStatus,
    searchProductAdmin,
    timeReport,
  ]);

  useEffect(() => {
    if (type === "user") {
      setTotalPage(totalPageUser);
    } else if (type === "product-brand") {
      setTotalPage(totalPageBrand);
    } else if (type === "product-type") {
      setTotalPage(totalPageProductType);
    } else if (type === "product-size") {
      setTotalPage(totalPageSize);
    } else if (type === "product") {
      setTotalPage(totalProduct);
    } else if (type === "productSize") {
      setTotalPage(totalProductSize);
    } else if (type === "voucher") {
      setTotalPage(totalVoucher);
    } else if (type === "order-admin") {
      setTotalPage(totalOrderAdmin);
    } else if (type === "report-admin") {
      setTotalPage(totalProductOrder);
    } else if (type === "blog") {
      setTotalPage(totalPageBlog);
    }
  }, [
    totalProductOrder,
    totalOrderAdmin,
    totalPageBrand,
    totalPageProductType,
    totalPageSize,
    totalPageUser,
    totalProduct,
    totalProductSize,
    totalVoucher,
    totalPageBlog,
    type,
  ]);

  const handlePageClick = (event) => {
    dispatch(handleChangePage(+event.selected + 1));
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <ReactPaginate
        nextLabel={
          <button>
            <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
          </button>
        }
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage ? totalPage : 1}
        previousLabel={
          <button>
            <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
          </button>
        }
        containerClassName={
          !isLoading ? "pagination-container" : "hide-pagination"
        }
        pageLinkClassName="number_a"
        previousClassName="button_previous"
        nextClassName="button_next"
        activeClassName="active"
        breakLabel="..."
        breakClassName="break"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default PaginatedItems;
