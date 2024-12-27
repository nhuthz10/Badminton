"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { fetchAllBlogRedux } from "@/redux-toolkit/blogSlice";
import {
  fetchAllProductOfTheProductTypeRedux,
  loadingProduct,
  fetchAllProductSaleOffRedux,
  fetchAllBrandRedux,
  fetchAllProductTypeRedux,
  fetchAllProductFavouriteRedux,
} from "../../redux-toolkit/productSlice";
import { fetchAllOrderRedux } from "../../redux-toolkit/orderSlice";
import { fetchAllProductSearchRedux } from "../../redux-toolkit/searchSlice";
import { LIMIT_PRODUCT, LIMIT_SEARCH, LIMIT_ORDER } from "../../utils";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import "./Pagination.scss";

function PaginatedItems({ type, productTypeId, orderStatus }) {
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(1);
  const currentPage = useSelector((state) => state.pagination.page);

  const pageCount = useSelector((state) => state.pagination.page);
  const totalBlog = useSelector((state) => state.blog.allBlog.totalPage);
  const listBlog = useSelector((state) => state.blog.allBlog.data);

  const totalProductOfTheProductType = useSelector(
    (state) => state.product.allProductOfTheProductType.totalPage
  );
  const totalProductSearch = useSelector(
    (state) => state.search.allResultSearch.totalPage
  );
  const listProductSearch = useSelector(
    (state) => state.search.allResultSearch.data
  );
  const totalOrder = useSelector((state) => state.order.allOrder.totalPage);
  const totalProductSaleOff = useSelector(
    (state) => state.product.allProductSaleOff.totalPage
  );
  const totalProductFavourite = useSelector(
    (state) => state.product.allProductFavourite.totalPage
  );
  const filter = useSelector((state) => state.product.filter);
  const sort = useSelector((state) => state.product.sort);
  const isLoading = useSelector((state) => state.product.isLoading);
  const userId = useSelector((state) => state.user.userInfo.id);
  const listProduct = useSelector(
    (state) => state.product.allProductOfTheProductType.data
  );
  const listProductSaleOff = useSelector(
    (state) => state.product.allProductSaleOff.data
  );
  const listProductFavourite = useSelector(
    (state) => state.product.allProductFavourite.data
  );
  const searchText = useSelector((state) => state.search.searchText);
  const isLogin = useSelector((state) => state.user.login);

  useEffect(() => {
    if (type === "user-product") {
      let getAllDataProduct = async () => {
        dispatch(loadingProduct(true));
        await dispatch(fetchAllBrandRedux({ pagination: false }));
        await dispatch(fetchAllProductTypeRedux({ pagination: false }));
        await dispatch(
          fetchAllProductOfTheProductTypeRedux({
            productTypeId: productTypeId,
            limit: LIMIT_PRODUCT,
            page: pageCount,
            sort: sort,
            filter: filter,
          })
        );
        dispatch(loadingProduct(false));
      };
      getAllDataProduct();
    } else if (type === "search-product") {
      let getAllDataSearch = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllProductSearchRedux({
            limit: LIMIT_SEARCH,
            page: pageCount,
            name: searchText,
          })
        );
        dispatch(loadingProduct(false));
      };
      getAllDataSearch();
    } else if (type === "order" && isLogin) {
      let getAllOrder = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllOrderRedux({
            userId: userId,
            status: orderStatus,
            limit: LIMIT_ORDER,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
      };
      getAllOrder();
    } else if (type === "sale-off-product") {
      let getAllDataProduct = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllProductSaleOffRedux({
            limit: LIMIT_SEARCH,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
      };
      getAllDataProduct();
    } else if (type === "favourite-product" && isLogin) {
      let getAllDataProduct = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllProductFavouriteRedux({
            userId: userId,
            limit: LIMIT_SEARCH,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
      };
      getAllDataProduct();
    } else if (type === "blog") {
      let getAllDataBlog = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllBlogRedux({
            limit: LIMIT_SEARCH,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
      };
      getAllDataBlog();
    }
  }, [
    type,
    dispatch,
    pageCount,
    productTypeId,
    sort,
    filter,
    searchText,
    orderStatus,
    userId,
  ]);

  useEffect(() => {
    if (type === "user-product") {
      setTotalPage(totalProductOfTheProductType);
    } else if (type === "search-product") {
      setTotalPage(totalProductSearch);
    } else if (type === "order") {
      setTotalPage(totalOrder);
    } else if (type === "sale-off-product") {
      setTotalPage(totalProductSaleOff);
    } else if (type === "favourite-product") {
      setTotalPage(totalProductFavourite);
    } else if (type === "blog") {
      setTotalPage(totalBlog);
    }
  }, [
    totalOrder,
    totalProductFavourite,
    totalProductOfTheProductType,
    totalProductSearch,
    totalBlog,
    totalProductSaleOff,
    type,
  ]);

  const handlePageClick = (event) => {
    dispatch(handleChangePage(+event.selected + 1));
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      {(type === "user-product" ||
        type === "search-product" ||
        type === "blog" ||
        type === "sale-off-product" ||
        type === "favourite-product") &&
      (listProduct?.length === 0 ||
        listProductSearch?.length === 0 ||
        listBlog?.length === 0 ||
        listProductSaleOff?.length === 0 ||
        listProductFavourite?.length === 0) ? null : (
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
      )}
    </div>
  );
}

export default PaginatedItems;
