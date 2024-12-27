import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./Recommendation.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  handleDeleteFavourite,
  handleCreateFavourite,
  handleGetAllFavourite,
} from "@/services/userService";
import { updateFavourites } from "@/redux-toolkit/userSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--white-color)",
        position: "absolute",
        transform: "translateY(-50%)",
        top: "35%",
        right: "0",
        height: "3.8rem",
        width: "3.8rem",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{
          fontSize: "var(--text-fontSize)",
          color: "var(--primary-color)",
        }}
        icon={faAngleRight}
      ></FontAwesomeIcon>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--white-color)",
        position: "absolute",
        transform: "translateY(-50%)",
        top: "35%",
        left: "0",
        height: "3.8rem",
        width: "3.8rem",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{
          fontSize: "var(--text-fontSize)",
          color: "var(--primary-color)",
        }}
        icon={faAngleLeft}
      ></FontAwesomeIcon>
    </div>
  );
};

const Recommendation = ({ data }) => {
  const [dataSlider, setDataSlider] = useState([]);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const favourites = useSelector((state) => state.user?.favourites);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    // autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length < 4) {
      for (let i = data.length; i < 4; i++) {
        data.push({
          id: "",
          image: "/images/ImgNoProduct.png",
        });
      }
    }
    setDataSlider(data);
  }, [data]);

  useEffect(() => {
    if (favourites && favourites?.length > 0) {
      let newData = data?.map((product) => {
        let newProduct = { ...product };
        newProduct.favourite = favourites?.includes(product.productId);
        return newProduct;
      });
      setDataSlider(newData);
    } else {
      setDataSlider(data);
    }
  }, [favourites, data]);

  const handleClickLike = async (productId, status) => {
    console.log("run");
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

  const handleClickProduct = (product) => {
    if (!product.productId) return;

    router.push(`/product/${product?.productTypeId}/${product.productId}`);

    // router.push(
    //   `/${convertSlugUrl(
    //     product.productTypeData?.productTypeName
    //   )}-${product.productTypeData?.productTypeId.toLowerCase()}/${convertSlugUrl(
    //     product.name
    //   )}-${product.productId.toLowerCase()}`
    // );
  };

  return (
    <div className="slider-red-container">
      <p className="slider-red-title">Các sản phẩm khác</p>
      <Slider {...settings} className="slider-red-content">
        {dataSlider &&
          dataSlider?.length > 0 &&
          dataSlider?.map((product, index) => {
            if (!product.productId) {
              return (
                <div className="slider-red-item" key={index}>
                  <Image
                    src={product?.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    className="slider-red-no-item"
                  ></Image>
                </div>
              );
            }

            return (
              <div onClick={() => handleClickProduct(product)} key={index}>
                <div className="slider-red-item">
                  <div>
                    <Image
                      src={product?.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                      className="slider-red-item-img"
                    ></Image>
                    <button
                      className="favourite-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      {product.favourite ? (
                        <FavoriteTwoToneIcon
                          onClick={() => {
                            handleClickLike(product.productId, "like");
                          }}
                          className="favourite-icon"
                          style={{ color: "var(--primary-color)" }}
                        />
                      ) : (
                        <FavoriteBorderTwoToneIcon
                          className="favourite-icon"
                          onClick={() => {
                            handleClickLike(product.productId, "noLike");
                          }}
                        />
                      )}
                    </button>
                  </div>
                  <div className="slider-red-item-name">{product.name}</div>
                  <div className="slider-red-item-rating">
                    <Rating
                      defaultValue={0}
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      style={{
                        fontSize: "2.5rem",
                        marginRight: "0.5rem",
                      }}
                    />
                    <p style={{ lineHeight: 1.5 }}>
                      {product.rating}/<span>5</span>
                    </p>
                  </div>
                  <div className="slider-red-item-price">
                    <p
                      style={{
                        color:
                          product.discount !== 0
                            ? "rgba(0,0,0,.54)"
                            : "var(--primary-color)",
                        textDecoration:
                          product.discount !== 0 ? "line-through" : "",
                        marginRight: 10,
                      }}
                    >
                      {currencyFormatter.format(product.price)}
                      <span
                        style={{
                          textDecoration: "underline",
                          marginLeft: 2,
                        }}
                      >
                        đ
                      </span>
                    </p>
                    {product.discount !== 0 ? (
                      <p>
                        {currencyFormatter.format(
                          product.price -
                            (product.price * product.discount) / 100
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
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Recommendation;
