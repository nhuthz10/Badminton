import UserLayout from "@/layout/userLayout/UserLayout";
import { handleGetBlogService } from "@/services/blogService";
import { headers } from "next/headers";

export async function generateMetadata() {
  return {
    title: "Trang Chủ - Cửa Hàng Đồ Cầu Lông Chính Hãng",
    description:
      "Chào mừng đến với cửa hàng đồ cầu lông chính hãng. Chúng tôi cung cấp vợt cầu lông, giày cầu lông, quần áo và phụ kiện chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: "./",
    },
  };
}

export default function LayoutUser({ children }) {
  return <UserLayout>{children}</UserLayout>;
}
