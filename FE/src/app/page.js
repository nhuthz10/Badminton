"use client";
import React, { useEffect } from "react";
import Banner from "@/components/Banner/Banner";
import Introduce from "@/components/Introduce/Introduce";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import UserLayout from "@/layout/userLayout/UserLayout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/commonUtils";
import "./page.scss";

function Home() {
  return (
    <UserLayout>
      <div className="home-container">
        <Banner></Banner>
        <div className="home-content">
          <Introduce></Introduce>
          <div className="home-benefit">
            <ThemeProvider theme={theme}>
              <Grid
                container
                columnSpacing={{ xl: 8, lg: 8, md: 8, sm: 4, xs: 4 }}
                rowSpacing={4}
              >
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                  <div className="home-benefit-wrap-item">
                    <div className="home-benefit-item">
                      <Image
                        src="/images/policy_image_2 1.png"
                        width={60}
                        height={60}
                        alt=""
                        className="home-benefit-item-img"
                      ></Image>
                      <div className="home-benefit-item-text">
                        Vận chuyển toàn quốc, thanh toán khi nhận hàng
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                  <div className="home-benefit-wrap-item">
                    <div className="home-benefit-item">
                      <Image
                        src="/images/thanh_toan 1.png"
                        height={60}
                        width={60}
                        alt=""
                        className="home-benefit-item-img"
                      ></Image>
                      <div className="home-benefit-item-text">
                        Tiến hành thanh toán với nhiều phương thức
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                  <div className="home-benefit-wrap-item">
                    <div className="home-benefit-item">
                      <Image
                        src="/images/policy_image_1 1.png"
                        alt=""
                        height={60}
                        width={60}
                        className="home-benefit-item-img"
                      ></Image>
                      <div className="home-benefit-item-text">
                        Sản phẩm đảm bảo chất lượng
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Home;
