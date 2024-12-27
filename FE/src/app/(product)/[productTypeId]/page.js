"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { useDebounce } from "@/utils/commonUtils";
import "./page.scss";
import PaginatedItems from "@/components/Pagination/Pagination";
import {
  handleFilterProduct,
  handleSortProduct,
} from "@/redux-toolkit/productSlice";
import {
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
} from "@/services/userService";
import { handleGetProductTypeService } from "@/services/productService";
import Image from "next/image";
import { sortBy } from "@/utils/index";
import { toast } from "react-toastify";
import { logOut, updateFavourites } from "@/redux-toolkit/userSlice";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import DrawerFiter from "@/components/DrawerFilter/DrawerFilter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/commonUtils";
import ProductSidebar from "@/components/ProductSidebar/ProductSidebar";
import { PRICE_VALUE_FILTER_TO, PRICE_VALUE_FILTER_FORM } from "@/utils/index";
import { convertSlugUrl } from "@/utils/commonUtils";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Product = ({ params }) => {
  const [productType, setProductType] = useState({});
  const [isOpenDrawerFilter, setIsOpenDrawerFilter] = useState(false);
  const [checkBrands, setCheckBrands] = useState([]);
  const [sortValue, setSortValue] = useState(sortBy[0]);
  const [priceValue, setPriceValue] = useState([
    PRICE_VALUE_FILTER_FORM,
    PRICE_VALUE_FILTER_TO,
  ]);
  const dispatch = useDispatch();
  const productPagination = useSelector(
    (state) => state.product.allProductOfTheProductType.data
  );
  const [paginationData, setPaginationData] = useState([]);
  const brands = useSelector((state) => state.product?.allBrand?.data);
  const isLoading = useSelector((state) => state.product.isLoading);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const favourites = useSelector((state) => state.user?.favourites);

  const parts = params.productTypeId.split("-");
  const productTypeId = parts[parts.length - 1].toUpperCase();

  const debounceBrands = useDebounce(checkBrands, 500);
  const debouncePrice = useDebounce(priceValue, 500);

  const getProductType = async () => {
    try {
      let res = await handleGetProductTypeService(productTypeId);
      if (res && res.errCode === 0) {
        setProductType(res?.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message, {
        className: "toast-normal",
      });
    }
  };

  useEffect(() => {
    getProductType();
  }, [productTypeId]);

  useEffect(() => {
    dispatch(handleSortProduct(sortValue.id));
    dispatch(handleChangePage(1));
    dispatch(
      handleFilterProduct({
        brandId: debounceBrands,
        price: debouncePrice,
      })
    );
  }, [debounceBrands, debouncePrice, sortValue]);

  const handleChangePrice = (event, newValue) => {
    setPriceValue(newValue);
  };

  const handleSortValue = (item) => {
    setSortValue(item);
  };

  const handleCheckBrands = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckBrands((prev) => [...prev, value]);
    } else {
      setCheckBrands((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    if (favourites && favourites?.length > 0) {
      let newPaginationData = productPagination?.map((product) => {
        let newProduct = { ...product };
        newProduct.favourite = favourites?.includes(product.productId);
        return newProduct;
      });
      setPaginationData(newPaginationData);
    } else {
      setPaginationData(productPagination);
    }
  }, [favourites, productPagination]);

  const handleClickLike = async (productId, status) => {
    if (userId) {
      try {
        if (status === "like") {
          let res = await handleDeleteFavourite(userId, productId);
          if (res && res.errCode === 0) {
            let ress = await handleGetAllFavourite(userId);
            dispatch(updateFavourites(ress?.data));
          } else {
            toast.error(res?.message, {
              className: "toast-normal",
            });
          }
        }
        if (status === "noLike") {
          let res = await handleCreateFavourite({
            productId: productId,
            userId: userId,
          });
          if (res && res.errCode === 0) {
            let ress = await handleGetAllFavourite(userId);
            dispatch(updateFavourites(ress?.data));
          } else {
            toast.error(res?.message, {
              className: "toast-normal",
            });
          }
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
    <>
      <div className="product-page">
        <div
          className="product-wrap-filter"
          onClick={() => setIsOpenDrawerFilter(true)}
        >
          <FilterAltIcon className="filter-icon" />
        </div>
        <div className="product-wrap-sidebar">
          <ProductSidebar
            brands={brands}
            priceValue={priceValue}
            checkBrands={checkBrands}
            handleChangePrice={handleChangePrice}
            handleCheckBrands={handleCheckBrands}
          ></ProductSidebar>
        </div>
        <div className="product-content">
          <div className="sort-container">
            <h1 className="product-type-title">
              {productType?.productTypeName}
            </h1>
            <div className="sort-content">
              <div className="sort-title">
                <FontAwesomeIcon icon={faArrowDownWideShort} />
                <span>Sắp xếp: </span>
              </div>
              <Tippy
                interactive
                placement="bottom"
                delay={[0, 300]}
                offset={[0, 4]}
                render={(attrs) => (
                  <div className="dropdown-sort" tabIndex="-1" {...attrs}>
                    {sortBy.map((item, index) => {
                      if (item.value !== sortValue.value) {
                        return (
                          <button
                            key={index}
                            onClick={() => handleSortValue(item)}
                          >
                            {item.value}
                          </button>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                )}
              >
                <div className="sort-value">
                  <p>{sortValue.value}</p>
                  <div className="sort-underline"></div>
                </div>
              </Tippy>
            </div>
          </div>
          <div className="list-product">
            {paginationData?.length === 0 && !isLoading ? (
              <div className="no-product">
                <h1>Không có sản phẩm nào</h1>
                <Image
                  src="/images/noProduct.png"
                  height={315}
                  width={315}
                  sizes="100vw"
                  alt=":(("
                />
              </div>
            ) : (
              <ThemeProvider theme={theme}>
                <Grid
                  container
                  rowSpacing={{ xl: 1.5, lg: 1.5, md: 2, sm: 2, xs: 2 }}
                  columnSpacing={{ xl: 1.5, lg: 1.5, md: 2, sm: 2, xs: 2 }}
                >
                  {paginationData?.length > 0 &&
                    paginationData?.map((item, index) => {
                      return (
                        <Grid
                          item
                          xl={3}
                          lg={4}
                          md={4}
                          sm={6}
                          xs={12}
                          key={index}
                        >
                          <Link
                            href={`/${convertSlugUrl(
                              item.productTypeData.productTypeName
                            )}-${item.productTypeData.productTypeId.toLowerCase()}/${convertSlugUrl(
                              item.name
                            )}-${item.productId.toLowerCase()}`}
                            className="product-item"
                          >
                            <Image
                              src={item.image}
                              className="product-img"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                objectFit:
                                  item.productTypeData?.productTypeName ===
                                  "Áo cầu lông"
                                    ? "cover"
                                    : "contain",
                              }}
                              alt="product"
                            ></Image>
                            <button
                              className="favourite-btn"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {item.favourite ? (
                                <FavoriteTwoToneIcon
                                  onClick={() => {
                                    handleClickLike(item.productId, "like");
                                  }}
                                  className="favourite-icon"
                                  style={{ color: "red" }}
                                />
                              ) : (
                                <FavoriteBorderTwoToneIcon
                                  className="favourite-icon"
                                  onClick={() => {
                                    handleClickLike(item.productId, "noLike");
                                  }}
                                />
                              )}
                            </button>
                            <div className="product-infor">
                              <p className="product-name">{item.name}</p>
                              <div className="product-rating">
                                <Rating
                                  defaultValue={0}
                                  value={item.rating}
                                  precision={0.5}
                                  readOnly
                                  style={{
                                    fontSize: "2.5rem",
                                    marginLeft: "0.5rem",
                                  }}
                                />
                                <p style={{ lineHeight: 1.5 }}>
                                  {item.rating}/<span>5</span>
                                </p>
                              </div>
                              <div className="product-price">
                                <p
                                  style={{
                                    color:
                                      item.discount !== 0
                                        ? "rgba(0,0,0,.54)"
                                        : "var(--primary-color)",
                                    textDecoration:
                                      item.discount !== 0 ? "line-through" : "",
                                    marginRight: 10,
                                  }}
                                >
                                  {currencyFormatter.format(item.price)}
                                  <span
                                    style={{
                                      textDecoration: "underline",
                                      marginLeft: 2,
                                    }}
                                  >
                                    đ
                                  </span>
                                </p>
                                {item.discount !== 0 ? (
                                  <p>
                                    {currencyFormatter.format(
                                      item.price -
                                        (item.price * item.discount) / 100
                                    )}
                                    <span
                                      style={{
                                        textDecoration: "underline",
                                        marginLeft: 2,
                                      }}
                                    >
                                      đ
                                    </span>
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </Link>
                        </Grid>
                      );
                    })}
                </Grid>
              </ThemeProvider>
            )}
          </div>
          <div className="line-wrapper">
            <span className="line"></span>
          </div>
          <div style={{ marginTop: 50 }}>
            <PaginatedItems
              type={"user-product"}
              productTypeId={productTypeId}
            />
          </div>
        </div>
      </div>
      <DrawerFiter
        isOpenDrawer={isOpenDrawerFilter}
        setIsOpenDrawer={setIsOpenDrawerFilter}
        brands={brands}
        checkBrands={checkBrands}
        priceValue={priceValue}
        handleChangePrice={handleChangePrice}
        handleCheckBrands={handleCheckBrands}
      />
    </>
  );
};

export default Product;
