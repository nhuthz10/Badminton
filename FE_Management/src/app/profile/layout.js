import UserLayout from "@/layout/userLayout/UserLayout";
import ProtectAdmin from "@/ProtectAdmin";

export const metadata = {
  title: "Trang Quản Lý - Cửa Hàng Đồ Cầu Lông Chính Hãng",
};

export default function LayoutUser({ children }) {
  return (
    <UserLayout>
      <ProtectAdmin>{children}</ProtectAdmin>
    </UserLayout>
  );
}
