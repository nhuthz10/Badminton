import { Inter } from "next/font/google";
import Providers from "@/Providers";
import "./global.scss";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Trang Quản Lý - Cửa Hàng Đồ Cầu Lông Chính Hãng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
