import React from "react";
import "./Footer.scss";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { theme } from "@/utils/commonUtils";

const Footer = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid className="footer-container" container spacing={5}>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="col-footer">
              <h1>THÔNG TIN CHUNG</h1>
              <p className="logo-footer">
                <span>BMT</span> là hệ thống cửa hàng cầu lông với hơn 50 chi
                nhánh trên toàn quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu
                lông từ phong trào tới chuyên nghiệp
              </p>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="col-footer">
              <h1>THÔNG TIN LIÊN HỆ</h1>
              <p>
                Hệ thống cửa hàng: <span>58 cửa hàng trên toàn quốc</span>
              </p>
              <p>
                Hotline: <span>0989585858, 0969696969 </span>
              </p>
              <p>
                Hotline bán sỉ: <span>0989585858</span>
              </p>
              <p>
                Email: <span>info@shopbmt.com</span>
              </p>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="policy col-footer">
              <h1>CHÍNH SÁCH</h1>
              <p>Chính sách đổi trả, hoàn tiền</p>
              <p>Chính sách xử lý, khiếu nại</p>
              <p>Chính sách bảo hành</p>
              <p>Chính sách vận chuyển</p>
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Footer;
