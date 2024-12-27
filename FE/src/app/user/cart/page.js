"use client";
import React, { useEffect, useState } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import PaymentsIcon from "@mui/icons-material/Payments";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paypal from "@/components/Paypal/Paypal";
import {
  handleCreateNewOrderService,
  handlePaymentByVnPayService,
} from "@/services/orderService";
import {
  handleUpdateProductCartService,
  handleDeleteProductCartService,
} from "@/services/cartService";
import { handleGetInforUserService } from "@/services/userService";
import { useDispatch, useSelector } from "react-redux";
import "./page.scss";
import Voucher from "@/components/Voucher/Voucher";
import { useDebounce } from "@/utils/commonUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  fetchAllProductCart,
  updateAllProduct,
} from "@/redux-toolkit/cartSlice";
import { logOut } from "@/redux-toolkit/userSlice";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/commonUtils";
import { useSocket } from "@/SocketContext";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Cart = () => {
  const [paymentValue, setPaymentValue] = useState("COD");
  const [vnpResponseCode, setVnpResponseCode] = useState(null);
  const [items, setItems] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [voucherSelect, setVoucherSelect] = useState(false);
  const [voucherPrice, setVoucherPrice] = useState(0);
  const [voucherId, setVoucherId] = useState("");
  const [currentTotalPrice, setCurrentTotalPrice] = useState("");
  const [pricePayment, setPricePayment] = useState(0);
  const cartId = useSelector((state) => state.user.cartId);
  const userId = useSelector((state) => state.user.userInfo.id);
  const allProduct = useSelector((state) => state.cart.allProduct);
  const [showPaypal, setShowPaypal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const socket = useSocket();
  const dispatch = useDispatch();

  let currentProductDebounce = useDebounce(currentProduct, 500);

  let getInforUser = async () => {
    try {
      let res = await handleGetInforUserService(userId);
      if (res && res.errCode === 0) {
        setUserInfo({
          name: res?.data?.userName,
          phone: res?.data?.phoneNumber,
          address: res?.data?.deliveryAddressData[0],
          email: res?.data?.email,
        });
      }
    } catch (err) {
      if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("vnp_ResponseCode");
    setVnpResponseCode(code);
  }, []);

  useEffect(() => {
    if (!vnpResponseCode) return;

    if (vnpResponseCode === "07") {
      toast.error("Giao dịch bị nghi ngờ liên quan tới lừa đảo", {
        className: "toast-normal",
      });
      router.push("/user/cart");
    } else if (vnpResponseCode === "09") {
      toast.error(
        "Thẻ/Tài khoản của bạn chưa đăng ký dịch vụ InternetBanking tại ngân hàng",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    } else if (vnpResponseCode === "10") {
      toast.error(
        "Bạn đã xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    } else if (vnpResponseCode === "11") {
      toast.error(
        "Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    } else if (vnpResponseCode === "12") {
      toast.error("Thẻ/Tài khoản của bạn bị khóa", {
        className: "toast-normal",
      });
      router.push("/user/cart");
    } else if (vnpResponseCode === "13") {
      toast.error(
        "Bạn đã nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    } else if (vnpResponseCode === "24") {
      toast.error("Bạn đã hủy giao dịch", {
        className: "toast-normal",
      });
      router.push("/user/cart");
    } else if (vnpResponseCode === "51") {
      toast.error("Tài khoản của bạn không đủ số dư để thực hiện giao dịch", {
        className: "toast-normal",
      });
      router.push("/user/cart");
    } else if (vnpResponseCode === "65") {
      toast.error(
        "Tài khoản của bạn đã vượt quá hạn mức giao dịch trong ngày",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    } else if (vnpResponseCode === "75") {
      toast.error("Ngân hàng thanh toán đang bảo trì", {
        className: "toast-normal",
      });
      router.push("/user/cart");
    } else if (vnpResponseCode === "79") {
      toast.error(
        "Bạn đã nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    } else if (vnpResponseCode === "99") {
      toast.error(
        "Đã xãy ra lỗi trong quá trình thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch",
        {
          className: "toast-normal",
        }
      );
      router.push("/user/cart");
    }
  }, [vnpResponseCode]);

  useEffect(() => {
    if (cartId) {
      getAllProductCart();
    }
  }, [cartId]);

  useEffect(() => {
    getInforUser();
  }, []);

  useEffect(() => {
    setPricePayment(currentTotalPrice - voucherPrice + 30000);
  }, [voucherPrice, currentTotalPrice]);

  useEffect(() => {
    if (Object.keys(currentProduct).length !== 0) {
      updateProductCart(currentProduct);
    }
  }, [currentProductDebounce]);

  useEffect(() => {
    if (paymentValue === "PAYPAL") {
      setShowPaypal(true);
    } else {
      setShowPaypal(false);
    }
  }, [paymentValue]);

  useEffect(() => {
    let totalPrice = allProduct.reduce(
      (accumulator, product) => product.totalPrice + accumulator,
      0
    );

    let newAllProduct = [...allProduct];

    let newItems = newAllProduct.map((product) => {
      return {
        id: product.productId,
        name: product.name,
        unit_amount: {
          currency_code: "USD",
          value: product.price,
        },
        quantity: product.quantity,
      };
    });

    setCurrentTotalPrice(totalPrice);
    setItems(newItems);
  }, [allProduct]);

  const updateProductCart = async (data) => {
    try {
      let res = await handleUpdateProductCartService(data);
      if (res && res.errCode === 0) {
        getAllProductCart();
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

  const getAllProductCart = async () => {
    await dispatch(fetchAllProductCart({ userId: userId }));
  };

  const handleChangePayment = (e) => {
    if (!userInfo.phone) {
      toast.error("Vui lòng cập nhật số điện thoại để tiếp tục mua hàng", {
        className: "toast-normal",
      });
    } else if (!userInfo.address) {
      toast.error("Vui lòng cập nhật địa chỉ để tiếp tục mua hàng", {
        className: "toast-normal",
      });
    } else if (allProduct?.length === 0 && e.target.value === "PAYPAL") {
      toast.error("Không có sản phẩm nào để đặt hàng", {
        className: "toast-normal",
      });
    } else {
      setPaymentValue(e.target.value);
    }
  };

  const handleChangeName = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleChangePhone = (e) => {
    setUserInfo({ ...userInfo, phone: e.target.value });
  };

  const handleChangeAddress = (e) => {
    setUserInfo({ ...userInfo, address: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const handleSelectVoucher = () => {
    setVoucherSelect(true);
  };

  const handleDecrement = (product) => {
    if (product.quantity >= 2) {
      let currentProduct = allProduct.map((item) => {
        if (
          item.productId === product.productId &&
          item.sizeId === product.sizeId
        ) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCurrentProduct({
        userId: userId,
        productId: product.productId,
        quantity: currentProduct.find(
          (item) =>
            item.productId === product.productId &&
            item.sizeId === product.sizeId
        ).quantity,
        sizeId: product.sizeId,
        totalPrice:
          +currentProduct.find(
            (item) =>
              item.productId === product.productId &&
              item.sizeId === product.sizeId
          ).quantity *
          (+product.price - (+product.price * +product.discount) / 100),
      });
      dispatch(updateAllProduct(currentProduct));
    }
  };

  const handleIncrement = (product) => {
    if (product.quantity < product.quantitySize) {
      let currentProduct = allProduct.map((item) => {
        if (
          item.productId === product.productId &&
          item.sizeId === product.sizeId
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCurrentProduct({
        userId: userId,
        productId: product.productId,
        quantity: currentProduct.find(
          (item) =>
            item.productId === product.productId &&
            item.sizeId === product.sizeId
        ).quantity,
        sizeId: product.sizeId,
        totalPrice:
          +currentProduct.find(
            (item) =>
              item.productId === product.productId &&
              item.sizeId === product.sizeId
          ).quantity *
          (+product.price - (+product.price * +product.discount) / 100),
      });
      dispatch(updateAllProduct(currentProduct));
    }
  };

  const handleDeleteProductCart = async (product) => {
    try {
      let res = await handleDeleteProductCartService(
        product.productId,
        product.sizeId,
        userId
      );
      if (res && res.errCode === 0) {
        getAllProductCart();
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

  const handleOrderProduct = async () => {
    if (!userInfo.phone) {
      toast.error("Vui lòng cập nhật số điện thoại để tiếp tục mua hàng", {
        className: "toast-normal",
      });
    } else if (!userInfo.address) {
      toast.error("Vui lòng cập nhật địa chỉ để tiếp tục mua hàng");
    } else {
      if (allProduct?.length > 0) {
        if (paymentValue === "COD") {
          try {
            let res = await handleCreateNewOrderService({
              cartId: cartId,
              userId: userId,
              voucherId: voucherId,
              payment: paymentValue,
              totalPrice: pricePayment,
              deliveryAddress: userInfo.address,
              status: 1,
            });
            if (res && res.errCode === 0) {
              getAllProductCart();
              toast.success("Đặt hàng thành công", {
                className: "toast-normal",
              });
              socket.emit("order-succeed", res?.orderId);
              router.push(`/user/orders/${res?.orderId}`);
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
        }
        if (paymentValue === "VNPAY") {
          try {
            let res = await handlePaymentByVnPayService({
              cartId: cartId,
              userId: userId,
              voucherId: voucherId,
              payment: paymentValue,
              totalPrice: pricePayment,
              deliveryAddress: userInfo.address,
              status: 1,
            });
            if (res && res.errCode === 0) {
              window.location.href = res.urlPayment;
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
        }
      } else {
        toast.error("Không có sản phẩm nào để đặt hàng", {
          className: "toast-normal",
        });
      }
    }
  };

  const handlePaymentByPaypal = async (response) => {
    try {
      const transactionId = response.purchase_units[0].payments.captures[0].id;
      let res = await handleCreateNewOrderService({
        orderId: transactionId + "-paypal",
        cartId: cartId,
        userId: userId,
        voucherId: voucherId,
        payment: paymentValue,
        totalPrice: pricePayment,
        deliveryAddress: userInfo.address,
        status: 1,
      });
      if (res && res.errCode === 0) {
        getAllProductCart();
        toast.success("Đặt hàng thành công", {
          className: "toast-normal",
        });
        socket.emit("order-succeed", res?.orderId);
        router.push(`/user/orders/${res?.orderId}`);
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

  return (
    <div className="cart-page">
      <h1>Giỏ hàng của bạn</h1>
      <div className="cart-container">
        <ThemeProvider theme={theme}>
          <Grid
            container
            rowSpacing={{ md: 4, sm: 4, xs: 4 }}
            columnSpacing={{ xl: 4, lg: 4 }}
          >
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <div className="cart-list-product">
                {allProduct &&
                  allProduct?.length > 0 &&
                  allProduct?.map((product, index) => {
                    return (
                      <div key={index} style={{ position: "relative" }}>
                        <div className="product-item">
                          <div className="product-infor">
                            <Image
                              src={product.image}
                              width={0}
                              height={450}
                              sizes="100vw"
                              alt="product"
                              className="product-img"
                            />
                            <div className="wrap-name-price-product">
                              <div className="product-name">
                                <p>{product.name}</p>
                              </div>
                              <div className="product-price">
                                <p
                                  style={{
                                    color:
                                      product.discount !== 0
                                        ? "rgba(0,0,0,.54)"
                                        : "var(--primary-color)",
                                    textDecoration:
                                      product.discount !== 0
                                        ? "line-through"
                                        : "",
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
                              <div className="product-size">
                                <p>Kích cỡ: {product.sizeName}</p>
                              </div>
                              <div className="total-price">
                                <p>
                                  {currencyFormatter.format(product.totalPrice)}
                                  <span
                                    style={{
                                      textDecoration: "underline",
                                      marginLeft: 2,
                                    }}
                                  >
                                    đ
                                  </span>
                                </p>
                                <div className="quantity-btn">
                                  <button
                                    className="subtract-btn"
                                    onClick={() => handleDecrement(product)}
                                  >
                                    <RemoveIcon className="subtract-icon" />
                                  </button>
                                  <p>{product.quantity}</p>
                                  <button
                                    className="add-btn"
                                    onClick={() => handleIncrement(product)}
                                  >
                                    <AddTwoToneIcon className="add-icon" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteProductCart(product)}
                          >
                            <DeleteForeverTwoToneIcon className="delete-icon" />
                          </button>
                        </div>
                        {allProduct?.length - 1 !== index ? (
                          <div className="line"></div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <div className="cart-order">
                {!voucherSelect ? (
                  <>
                    <div className="order-detail">
                      <h2>Thông tin người nhận</h2>
                      <div className="order-infor">
                        <label htmlFor="name" className="order-label">
                          Họ tên
                        </label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          error={userInfo?.name?.length === 0 ? true : false}
                          inputProps={{
                            id: "name",
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                          value={userInfo.name ? userInfo.name : ""}
                          onChange={handleChangeName}
                        />
                      </div>
                      <div className="order-infor">
                        <label htmlFor="phone" className="order-label">
                          Số điện thoại
                        </label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          error={
                            userInfo?.phone?.length === 0 || !userInfo?.phone
                              ? true
                              : false
                          }
                          inputProps={{
                            id: "phone",
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                          value={userInfo.phone ? userInfo.phone : ""}
                          onChange={handleChangePhone}
                        />
                      </div>
                      <div className="order-infor">
                        <label htmlFor="address" className="order-label">
                          Địa chỉ
                        </label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          error={
                            userInfo?.address?.length === 0 ||
                            !userInfo?.address
                              ? true
                              : false
                          }
                          inputProps={{
                            id: "address",
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                          value={userInfo.address ? userInfo.address : ""}
                          onChange={handleChangeAddress}
                        />
                      </div>
                      <div className="order-infor">
                        <label htmlFor="email" className="order-label">
                          Email
                        </label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          error={userInfo?.email?.length === 0 ? true : false}
                          inputProps={{
                            id: "email",
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                          value={userInfo.email ? userInfo.email : ""}
                          onChange={handleChangeEmail}
                        />
                      </div>
                    </div>

                    <div className="line"></div>

                    <div className="order-detail">
                      <h2>Thông tin đơn hàng</h2>
                      <div className="order-infor">
                        <label className="order-label">Tổng cộng</label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          value={
                            currentTotalPrice
                              ? currencyFormatter.format(currentTotalPrice)
                              : 0
                          }
                          inputProps={{
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                        />
                      </div>
                      <div className="order-infor">
                        <label className="order-label">Giảm giá</label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          value={`- ${currencyFormatter.format(voucherPrice)}`}
                          inputProps={{
                            style: {
                              textAlign: "right",
                              color: "red",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                        />
                      </div>
                      <div className="order-infor">
                        <label className="order-label">Phí vận chuyển</label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          value={currencyFormatter.format(30000)}
                          inputProps={{
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                        />
                      </div>
                      <div className="order-infor">
                        <label className="order-label">Phải trả</label>
                        <TextField
                          className="order-input"
                          variant="standard"
                          value={
                            pricePayment
                              ? currencyFormatter.format(pricePayment)
                              : 0
                          }
                          inputProps={{
                            style: { textAlign: "right" },
                          }}
                          InputProps={{
                            readOnly: true,
                            style: {
                              fontSize: "var(--title-small-fontSize)",
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="line"></div>

                    <div className="order-detail">
                      <h2>Phương thức thanh toán</h2>
                      <RadioGroup
                        aria-labelledby="controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        className="radio-group"
                        onChange={handleChangePayment}
                        value={paymentValue}
                      >
                        <FormControlLabel
                          value="COD"
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "var(--primary-color)",
                                },
                              }}
                            />
                          }
                          label={
                            <span className="radio-label">
                              <p
                                style={{
                                  fontSize: "var(--title-small-fontSize)",
                                  width: 160,
                                }}
                              >
                                Khi nhận hàng
                              </p>
                              <MonetizationOnTwoToneIcon
                                style={{
                                  fontSize: "3rem",
                                  color:
                                    paymentValue === "COD"
                                      ? "var(--primary-color)"
                                      : null,
                                }}
                              />
                            </span>
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "2.5rem",
                            },
                          }}
                          className="radio"
                        />
                        <FormControlLabel
                          value="VNPAY"
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "var(--primary-color)",
                                },
                              }}
                            />
                          }
                          label={
                            <span className="radio-label">
                              <p
                                style={{
                                  fontSize: "var(--title-small-fontSize)",
                                  width: 160,
                                }}
                              >
                                VNPAY
                              </p>
                              <PaymentsIcon
                                style={{
                                  fontSize: "3rem",
                                  color:
                                    paymentValue === "VNPAY"
                                      ? "var(--primary-color)"
                                      : null,
                                }}
                              />
                            </span>
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "2.5rem",
                            },
                          }}
                          className="radio"
                        />
                        <FormControlLabel
                          value="PAYPAL"
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "var(--primary-color)",
                                },
                              }}
                            />
                          }
                          label={
                            <span className="radio-label">
                              <p
                                style={{
                                  fontSize: "var(--title-small-fontSize)",
                                  width: 160,
                                }}
                              >
                                PayPal
                              </p>
                              <PaymentTwoToneIcon
                                style={{
                                  fontSize: "3rem",
                                  color:
                                    paymentValue === "PAYPAL"
                                      ? "var(--primary-color)"
                                      : null,
                                }}
                              />
                            </span>
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "2.5rem",
                            },
                          }}
                          className="radio"
                        />
                      </RadioGroup>
                    </div>

                    <div className="payment" style={{ marginTop: "2.5rem" }}>
                      {showPaypal && (
                        <Paypal
                          currency={"USD"}
                          paymentSuccess={handlePaymentByPaypal}
                          items={items}
                        ></Paypal>
                      )}
                    </div>

                    <div className="line"></div>

                    <div className="voucher-wrapper">
                      <div className="voucher-name">
                        <SellOutlinedIcon className="voucher-icon" />
                        <p>
                          {voucherId === ""
                            ? "Hãy chọn mã voucher của bạn"
                            : voucherId}
                        </p>
                      </div>
                      <button
                        className="voucher-btn"
                        onClick={handleSelectVoucher}
                      >
                        <p>Chọn Voucher</p>
                      </button>
                    </div>

                    <button className="order-btn" onClick={handleOrderProduct}>
                      <ShoppingCartIcon className="order-icon" />
                      <p>Đặt hàng</p>
                    </button>
                  </>
                ) : (
                  <Voucher
                    setVoucherSelect={setVoucherSelect}
                    setVoucherPrice={setVoucherPrice}
                    setVoucherId={setVoucherId}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Cart;
