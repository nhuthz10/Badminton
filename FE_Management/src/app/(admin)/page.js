"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import "./page.scss";
import Chart from "@/components/Chart/Chart";
import { handleGetAllOrderStatistics } from "../../services/orderService";
import { logOut } from "@/redux-toolkit/userSlice";
import { theme } from "@/utils/commonUtils";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";

const xLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const OverView = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [allOrderStatus, setAllOrderStatus] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOrer, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [chartData, setChartData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    let getAllOrderStatistics = async () => {
      try {
        let res = await handleGetAllOrderStatistics();
        if (res && res.errCode === 0) {
          setRevenueData(res?.data?.allProduct);
          setTotalIncome(res?.data?.totalIncome);
          setTotalOrder(res?.data?.totalOrder);
          setTotalProduct(res?.data?.totalProduct);
          setAllOrderStatus(
            res?.data?.allTotalOrder.map((status) => {
              if (status.label === "Xác nhận") {
                status.img = "/images/image 37.png";
                status.to = "/order/order-waiting";
              } else if (status.label === "Đang giao") {
                status.img = "/images/image 36.png";
                status.to = "/order/order-delivery";
              } else if (status.label === "Hoàn tất") {
                status.img = "/images/image 34.png";
                status.to = "/order/order-done";
              } else {
                status.img = "/images/image 35.png";
                status.to = "/order/order-canceled";
              }
              return status;
            })
          );
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.errCode === -4) {
          toast.error("Phiên bản đăng nhập hết hạn");
          dispatch(logOut());
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    getAllOrderStatistics();
  }, []);

  useEffect(() => {
    const handleRevenueToMonth = () => {
      const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      revenueData?.forEach((item) => {
        let currentYear = new Date().getFullYear();
        let date = new Date(item.time);
        let month = date.getMonth();
        let year = date.getFullYear();
        if (year === currentYear) {
          switch (month) {
            case 0:
              newData[month] += item.totalPrice;
              break;
            case 1:
              newData[month] += item.totalPrice;
              break;
            case 2:
              newData[month] += item.totalPrice;
              break;
            case 3:
              newData[month] += item.totalPrice;
              break;
            case 4:
              newData[month] += item.totalPrice;
              break;
            case 5:
              newData[month] += item.totalPrice;
              break;
            case 6:
              newData[month] += item.totalPrice;
              break;
            case 7:
              newData[month] += item.totalPrice;
              break;
            case 8:
              newData[month] += item.totalPrice;
              break;
            case 9:
              newData[month] += item.totalPrice;
              break;
            case 10:
              newData[month] += item.totalPrice;
              break;
            case 11:
              newData[month] += item.totalPrice;
              break;
            default:
              break;
          }
        }
      });
      setChartData(newData);
    };
    handleRevenueToMonth();
  }, [revenueData]);

  return (
    <div className="admin-overview">
      <div className="statistic">
        <ThemeProvider theme={theme}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xl: 14, lg: 6, md: 4, sm: 2, xs: 2 }}
          >
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <div className="statistic-item">
                <Image
                  className="statistic-item-img"
                  height={64}
                  width={73}
                  src="/images/image 29.png"
                  alt="img"
                ></Image>
                <div className="statistic-item-info">
                  <p className="text">Tổng doanh thu</p>
                  <p className="number">
                    {currencyFormatter.format(totalIncome)}
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <div className="statistic-item">
                <Image
                  className="statistic-item-img"
                  height={64}
                  width={73}
                  src="/images/image 27.png"
                  alt="img"
                ></Image>
                <div className="statistic-item-info">
                  <p className="text">Tổng đơn hàng</p>
                  <p className="number">
                    {currencyFormatter.format(totalOrer)}
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <div className="statistic-item">
                <Image
                  className="statistic-item-img"
                  height={64}
                  width={73}
                  src="/images/image 28.png"
                  alt="img"
                ></Image>
                <div className="statistic-item-info">
                  <p className="text">Tổng sản phẩm</p>
                  <p className="number">
                    {currencyFormatter.format(totalProduct)}
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
      <div className="chart-container">
        <h1 className="text">THỐNG KÊ DOANH THU</h1>
        <Chart chartData={chartData} xLabels={xLabels} />
      </div>
      <div className="order-status-container">
        <h1 className="order-status-heading">THỐNG KÊ ĐƠN HÀNG</h1>
        <Grid className="order-status-grid-container" container>
          <Grid
            className="order-status-item order-item-left"
            style={{ borderTop: "1px solid gray" }}
            item
            xs={6}
          >
            <h2 style={{ fontSize: "var(--title-medium-fontSize)" }}>
              Trạng thái đơn hàng
            </h2>
          </Grid>
          <Grid
            className="order-status-item order-item-right"
            style={{ borderTop: "1px solid gray" }}
            item
            xs={6}
          >
            <h2 style={{ fontSize: "var(--title-medium-fontSize)" }}>
              Số lượng
            </h2>
          </Grid>
          {allOrderStatus?.length > 0 &&
            allOrderStatus?.map((item, index) => (
              <React.Fragment key={index}>
                <Grid className="order-status-item order-item-left" item xs={6}>
                  <Image
                    height={50}
                    width={55}
                    src={item.img}
                    alt="img"
                  ></Image>
                  <p>{item.label}</p>
                </Grid>
                <Grid
                  className="order-status-item order-item-right"
                  item
                  xs={6}
                >
                  <p>{item.quantity}</p>
                  <Link className="detail" href={item.to}>
                    Xem chi tiết
                  </Link>
                </Grid>
              </React.Fragment>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default OverView;
