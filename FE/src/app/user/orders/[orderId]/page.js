"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  handleGetOrderDetailService,
  handleCancleOrderService,
} from "@/services/orderService";
import "./page.scss";
import dayjs from "dayjs";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";
import { ThemeProvider } from "styled-components";
import { theme } from "@/utils/commonUtils";
import { useSocket } from "@/SocketContext";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function OrdersDetail({ params }) {
  const [orderDetailData, setOrderDetailData] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);
  const [vnpResponseCode, setVnpResponseCode] = useState(null);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const socket = useSocket();

  const dispatch = useDispatch();
  const router = useRouter();
  let getOrderDeatil = async () => {
    try {
      let res = await handleGetOrderDetailService(params.orderId, userId);
      if (res && res.errCode === 0) {
        setOrderDetailData(res?.data);
        switch (res?.data?.status) {
          case 1:
            setOrderStatus("Chờ xác nhận");
            break;
          case 2:
            setOrderStatus("Đang giao");
            break;
          case 3:
            setOrderStatus("Đã giao");
            break;
          case 0:
            setOrderStatus("Đã hủy");
            break;
          default:
            break;
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
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("vnp_ResponseCode");
    setVnpResponseCode(code);
  }, []);

  useEffect(() => {
    if (!vnpResponseCode) return;

    if (vnpResponseCode === "00") {
      toast.success("Đặt hàng thành công", {
        className: "toast-normal",
      });
      router.push(`/user/orders/${params.orderId}`);
    }
  }, [vnpResponseCode]);

  useEffect(() => {
    getOrderDeatil(params.orderId);
  }, [params.orderId]);

  let handleCancelOrder = async () => {
    try {
      let res = await handleCancleOrderService({
        userId: userId,
        orderId: params.orderId,
        orderDetail: orderDetailData?.orderDetail,
      });
      if (res && res.errCode === 0) {
        socket.emit("cancel-order-succeed", params.orderId);
        toast.success("Hũy đơn hàng thành công", {
          className: "toast-normal",
        });
        dispatch(handleChangePage(1));
        router.push("/user/orders");
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

  const formatterDate = (date) => {
    const dateObject = new Date(date);
    const formattedTime = dayjs(dateObject).format("DD/MM/YYYY");
    return formattedTime;
  };

  return (
    <div className="order-detail-container">
      <div className="order-detail-infor">
        <div className="information">
          <h3 style={{ marginBottom: 6 }}>
            Mã đơn hàng: {orderDetailData?.orderId}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Ngày đặt hàng: {formatterDate(orderDetailData?.createdAt)}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Tình trạng đơn hàng: {orderStatus}
          </h3>
        </div>

        <div className="information">
          <h3 style={{ marginBottom: 6 }}>
            Người nhận: {orderDetailData?.UserData?.userName}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Số điện thoại: {orderDetailData?.UserData?.phoneNumber}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Địa chỉ nhận hàng: {orderDetailData?.deliveryAddress}
          </h3>
        </div>

        <div className="information">
          <h3 style={{ marginBottom: 6 }}>Phương thức thanh toán:</h3>
          {orderDetailData?.payment === "COD" ? (
            <h3>Thanh toán khi nhận hàng (COD)</h3>
          ) : orderDetailData?.payment === "PAYPAL" ? (
            <h3>Thanh toán bằng Paypal</h3>
          ) : (
            <h3>Thanh toán bằng VNPAY</h3>
          )}
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <Grid container spacing={3} className="order-detail-products">
          {orderDetailData?.orderDetail?.length > 0 &&
            orderDetailData?.orderDetail?.map((item, index) => (
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
                <Box className="productDetail">
                  <Image
                    style={{ marginRight: 20, borderRadius: 4 }}
                    src={item.image}
                    height={100}
                    width={100}
                    alt="thumb"
                    className="thumbnail"
                  ></Image>
                  <div className="info">
                    <div className="infor-name">{item.name}</div>
                    <div style={{ display: "flex", margin: "8px 0" }}>
                      <div
                        style={{
                          color: item.discount !== 0 ? "rgba(0,0,0,.54)" : "",
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
                      </div>
                      {item.discount !== 0 ? (
                        <div>
                          {currencyFormatter.format(
                            item.price - (item.price * item.discount) / 100
                          )}
                          <span
                            style={{
                              textDecoration: "underline",
                              marginLeft: 2,
                            }}
                          >
                            đ
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      Kích cỡ: {item.sizeName}
                    </div>
                    <div>Số lượng: {item.quantity}</div>
                    <p style={{ color: "red" }}>
                      {currencyFormatter.format(item.totalPrice)}
                      <span
                        style={{
                          textDecoration: "underline",
                          marginLeft: 2,
                        }}
                      >
                        đ
                      </span>
                    </p>
                  </div>
                </Box>
              </Grid>
            ))}
        </Grid>
      </ThemeProvider>
      <div className="pay-contact-container">
        <div className="pay-contact">
          <div className="pay_discount">
            <div className="pay">
              <p className="txt_price">Tổng cộng:</p>
              <div className="price">
                {orderDetailData?.VoucherData?.voucherId
                  ? currencyFormatter.format(
                      orderDetailData?.totalPrice -
                        30000 +
                        orderDetailData?.VoucherData?.voucherPrice
                    )
                  : currencyFormatter.format(
                      orderDetailData?.totalPrice - 30000
                    )}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </div>
            </div>

            <div className="pay">
              <p className="txt_price">Phí vận chuyển:</p>
              <p className="price">
                {currencyFormatter.format(30000)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </p>
            </div>

            {orderDetailData?.VoucherData?.voucherId ? (
              <div className="pay">
                <p className="txt_price">Giảm giá: </p>
                <p className="price_discount">
                  {currencyFormatter.format(
                    orderDetailData?.VoucherData?.voucherPrice
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
              </div>
            ) : null}

            <div className="pay">
              <p className="txt_pay">Phải trả:</p>
              <p className="price">
                {currencyFormatter.format(orderDetailData?.totalPrice)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </p>
            </div>
          </div>

          <div
            className="btn_contact"
            style={{
              justifyContent:
                orderDetailData?.status !== 1 ? "center" : "space-between",
            }}
          >
            {orderDetailData?.status === 1 ? (
              <button onClick={handleCancelOrder} style={{ marginRight: 16 }}>
                Xác nhận hủy
              </button>
            ) : null}
            <button>
              <a
                style={{ color: "white" }}
                href="https://www.facebook.com/profile.php?id=100075108746922"
              >
                Liên hệ shop
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrdersDetail;
