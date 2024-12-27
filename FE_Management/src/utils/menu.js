import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import Person4Icon from "@mui/icons-material/Person4";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";

export const USER_MENU = [
  {
    to: "/profile",
    icon: PersonOutlineOutlinedIcon,
    text: "Thông tin tài khoản",
    type: "USER",
  },
  {
    to: "",
    icon: LogoutOutlinedIcon,
    text: "Đăng xuất",
    type: "LOGOUT",
  },
];

export const MENU_SIDEBAR = [
  {
    id: "default",
    value: "Tổng quan",
    icon: BusinessCenterIcon,
    path: "/",
    subMenu: null,
  },
  {
    id: "product-parent",
    value: "Quản lý sản phẩm",
    icon: ShoppingCartIcon,
    subMenu: [
      {
        id: "product",
        value: "Sản phẩm",
        path: "/product",
        subMenu: null,
      },
      {
        id: "product-type",
        value: "Loại sản phẩm",
        path: "/product-type",
        subMenu: null,
      },
      {
        id: "product-size",
        value: "Kích cỡ theo loại sản phẩm",
        path: "/product-size",
        subMenu: null,
      },
      {
        id: "product-brand",
        value: "Thương hiệu",
        path: "/product-brand",
        subMenu: null,
      },
    ],
  },
  {
    id: "order-parent",
    value: "Quản lý đơn hàng",
    icon: DescriptionIcon,
    subMenu: [
      {
        id: "order-waiting",
        value: "Đợi xác nhận",
        path: "/order/order-waiting",
        subMenu: null,
      },
      {
        id: "order-delivery",
        value: "Đang giao",
        path: "/order/order-delivery",
        subMenu: null,
      },
      {
        id: "order-done",
        value: "Hoàn tất",
        path: "/order/order-done",
        subMenu: null,
      },
      {
        id: "order-canceled",
        value: "Đã hủy",
        path: "/order/order-canceled",
        subMenu: null,
      },
    ],
  },
  {
    id: "user",
    value: "Quản lý người dùng",
    icon: Person4Icon,
    path: "/user",
    subMenu: null,
  },
  {
    id: "blog",
    value: "Quản lý bài viết",
    icon: ArticleIcon,
    path: "/blog",
    subMenu: null,
  },
  {
    id: "voucher",
    value: "Quản lý voucher",
    icon: LocalOfferIcon,
    path: "/voucher",
    subMenu: null,
  },
  {
    id: "revenue",
    value: "Báo cáo doanh thu",
    icon: BarChartIcon,
    path: "/revenue",
    subMenu: null,
  },
];
