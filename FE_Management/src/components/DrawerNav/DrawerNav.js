import Drawer from "@mui/material/Drawer";
import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { useDispatch } from "react-redux";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import Person4Icon from "@mui/icons-material/Person4";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./DeawerNav.scss";

const MENU = [
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

const DrawerNav = ({ isOpenDrawer, setIsOpenDrawer }) => {
  const [openMenuParent, setOpenMenuParent] = useState(null);
  const pathName = usePathname();
  const crum = pathName.split("/");
  const [selectedItem, setSelectedItem] = useState(crum[1] || "default");
  const [direction, setDirection] = useState("down");
  const menuRefs = useRef({});
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    setIsOpenDrawer(newOpen);
  };

  const handleClickMenu = (id) => {
    if (id === openMenuParent) {
      setOpenMenuParent(null);
    } else {
      const currentMenuRef = menuRefs.current[openMenuParent];
      const clickedMenuRef = menuRefs.current[id];
      if (currentMenuRef && clickedMenuRef) {
        const currentMenuPos = currentMenuRef.getBoundingClientRect();
        const clickedMenuPos = clickedMenuRef.getBoundingClientRect();

        if (clickedMenuPos.top > currentMenuPos.top) {
          setDirection("down");
        } else {
          setDirection("up");
        }
      }
      setOpenMenuParent(id);
    }
    setSelectedItem(id);
  };

  const handleClickMenuItem = (id, path) => {
    setSelectedItem(id);
    dispatch(handleChangePage(1));
    setIsOpenDrawer(false);
    router.push(path);
  };

  const renderMenu = (menu) => {
    return menu.map((item) => {
      const hasSubMenu = item.subMenu && item.subMenu.length > 0;
      const isOpen = openMenuParent === item.id;
      let Icon = item.icon;

      return (
        <div
          className="menu-container"
          key={item.id}
          ref={(el) => (menuRefs.current[item.id] = el)}
        >
          <div
            className={
              Icon
                ? `menu-item ${item.id === selectedItem ? "selected" : ""} `
                : `sub-menu-item ${item.id === selectedItem ? "selected" : ""}`
            }
            onClick={() => {
              if (hasSubMenu) {
                handleClickMenu(item.id);
              } else {
                handleClickMenuItem(item.id, item.path);
              }
            }}
          >
            <div className="menu-item-content">
              {Icon ? <Icon className="icon" /> : null}
              <h3 className="text">{item.value}</h3>
              {hasSubMenu && (
                <KeyboardArrowDownIcon
                  className={`arrow-icon ${isOpen ? "down" : "rotate"}`}
                />
              )}
            </div>
          </div>
          {hasSubMenu && (
            <div
              className={`sub-menu-container ${
                isOpen ? `open ${direction}` : ""
              }`}
            >
              {renderMenu(item.subMenu)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
      <div className="drawer-nav-container">
        <div className="drawer-nav-title">BAMITO</div>
        {renderMenu(MENU)}
      </div>
    </Drawer>
  );
};

export default DrawerNav;
