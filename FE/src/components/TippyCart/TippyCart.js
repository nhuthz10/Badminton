"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchAllProductCart } from "../../redux-toolkit/cartSlice";
import { convertSlugUrl } from "@/utils/commonUtils";
import "./TippyCart.scss";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const TippyCart = () => {
  const userId = useSelector((state) => state.user.userInfo?.id);
  const products = useSelector((state) => state?.cart?.allProduct);
  const productCountInCart = useSelector((state) => state.cart?.totalProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchAllProductCart({ userId: userId }));
    };
    getData();
  }, []);

  return (
    <div className="tippy-cart-container">
      <h2 className="tippy-cart-title">Sản Phẩm Mới Thêm</h2>
      {products && products.length > 0 ? (
        products.map((product, index) => {
          if (index >= 5) return null;
          return (
            <Link
              className="product-item"
              key={index}
              href={`/${convertSlugUrl(
                product.productTypeName
              )}-${product.productTypeId.toLowerCase()}/${convertSlugUrl(
                product.name
              )}-${product.productId.toLowerCase()}`}
            >
              <div className="product-wrap-img-name">
                <Image
                  src={product.image}
                  alt=""
                  width={54}
                  height={54}
                  className="product-img"
                ></Image>
                <div>
                  <div className="product-name">{product.name}</div>
                </div>
              </div>
              <div className="product-price">
                {currencyFormatter.format(product.price)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="no-product">
          <h2 style={{ textAlign: "center" }}>Không có sản phẩm nào</h2>
          <Image
            src="/images/noProduct.png"
            width={0}
            height={0}
            sizes="100vw"
            alt=":(("
            style={{ width: "100%", height: "270px" }}
          />
        </div>
      )}
      {products && products?.length > 0 ? (
        <div className="tippy-cart-footer">
          {productCountInCart > 5 ? (
            <span className="count-product-in-cart">
              {productCountInCart - 5} Thêm Hàng Vào Giỏ
            </span>
          ) : null}

          <Link
            href="/user/cart"
            className="btn-show-cart"
            style={{ marginLeft: "auto" }}
          >
            Xem giỏ hàng
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default TippyCart;
