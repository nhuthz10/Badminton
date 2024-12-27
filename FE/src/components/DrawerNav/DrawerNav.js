import Drawer from "@mui/material/Drawer";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./DeawerNav.scss";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import {
  handleFilterProduct,
  handleSortProduct,
} from "@/redux-toolkit/productSlice";
import { PRICE_VALUE_FILTER_FORM, PRICE_VALUE_FILTER_TO } from "@/utils";
import { useDispatch } from "react-redux";
import _ from "lodash";

const MENU = [
  {
    id: "home",
    title: "TRANG CHỦ",
    path: "/",
    subMenu: null,
  },
  {
    id: "product",
    title: "SẢN PHẨM",
    subMenu: null,
  },
  {
    id: "sale-off",
    title: "SALE OFF",
    path: "/sale-off",
    subMenu: null,
  },
  {
    id: "blog",
    title: "TIN TỨC",
    path: "/tin-tuc",
    subMenu: null,
  },
];

const DrawerNav = ({ isOpenDrawer, setIsOpenDrawer, productTypes }) => {
  const router = useRouter();
  const [openMenuParents, setOpenMenuParents] = useState([]);
  const [menu, setMenu] = useState(MENU);
  const dispatch = useDispatch();

  useEffect(() => {
    let tempMenu = _.cloneDeep(menu);
    tempMenu = tempMenu.map((item) => {
      if (item.id === "product") {
        item.subMenu = productTypes.map((productType) => {
          return {
            id: productType.productTypeId,
            title: productType.productTypeName,
            path: `/product/${productType.productTypeId}`,
            subMenu: null,
          };
        });
      }
      return item;
    });
    setMenu(tempMenu);
  }, [isOpenDrawer]);

  const toggleDrawer = (newOpen) => () => {
    setIsOpenDrawer(newOpen);
  };

  const handleMenuClick = (id) => {
    if (openMenuParents.includes(id)) {
      setOpenMenuParents(openMenuParents.filter((item) => item !== id));
    } else {
      setOpenMenuParents([...openMenuParents, id]);
    }
  };

  const handleClickMenuItem = (path) => {
    router.push(path);
    setIsOpenDrawer(false);
    setOpenMenuParents([]);
    dispatch(handleChangePage(1));
    dispatch(
      handleFilterProduct({
        brandId: [],
        price: [PRICE_VALUE_FILTER_FORM, PRICE_VALUE_FILTER_TO],
      })
    );
    dispatch(handleSortProduct(`["id", "DESC"]`));
  };

  const renderMenu = (menu) => {
    return menu.map((item) => {
      const hasSubMenu = item.subMenu && item.subMenu.length > 0;
      const isOpen = openMenuParents.includes(item.id);

      return (
        <Fragment key={item.id}>
          <div
            className="drawer-nav-item"
            onClick={() => {
              if (hasSubMenu) {
                handleMenuClick(item.id);
              } else {
                handleClickMenuItem(item.path);
              }
            }}
          >
            <p>{item.title}</p>
            {hasSubMenu && (
              <KeyboardArrowDownIcon
                className={`drawer-nav-item-icon ${isOpen ? "open" : ""}`}
              />
            )}
          </div>
          {hasSubMenu && isOpen && (
            <div className="sub-menu">{renderMenu(item.subMenu)}</div>
          )}
        </Fragment>
      );
    });
  };

  return (
    <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
      <div className="drawer-nav-container">
        <div className="drawer-nav-title">DANH MỤC SẢN PHẨM</div>
        {renderMenu(menu)}
      </div>
    </Drawer>
  );
};

export default DrawerNav;
