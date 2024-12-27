"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import { usePathname, useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Collapse } from "react-collapse";
import { MENU_SIDEBAR } from "@/utils/menu";
import "./AdminSidebar.scss";

const AdminSidebar = () => {
  const [openMenuParent, setOpenMenuParent] = useState(null);
  const pathName = usePathname();
  const [selectedItem, setSelectedItem] = useState("default");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const crum = pathName.split("/");
    let selected = crum[1] || "default";
    if (selected === "order") selected = crum[2];
    setSelectedItem(selected);

    const parentMenu = MENU_SIDEBAR.find((menuItem) =>
      menuItem.subMenu?.some((sub) => sub.id === selected)
    );
    if (parentMenu) setOpenMenuParent(parentMenu.id);
  }, [pathName]);

  const handleClickMenu = (id) => {
    setOpenMenuParent(openMenuParent === id ? null : id);
    setSelectedItem(id);
  };

  const handleClickMenuItem = (path) => {
    dispatch(handleChangePage(1));
    router.push(path);
  };

  const renderMenu = (menu) => {
    return menu.map((item) => {
      const hasSubMenu = item.subMenu && item.subMenu.length > 0;
      const isOpen = openMenuParent === item.id;
      let Icon = item.icon;

      return (
        <div className="menu-container" key={item.id}>
          <div
            className={`menu-item ${
              item.id === selectedItem ? "selected" : ""
            }`}
            onClick={() => {
              if (hasSubMenu) {
                handleClickMenu(item.id);
              } else {
                handleClickMenuItem(item.path);
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
            <Collapse isOpened={isOpen}>
              <div className="sub-menu-container">
                {renderMenu(item.subMenu)}
              </div>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return (
    <div className="admin-sidebar-container">{renderMenu(MENU_SIDEBAR)}</div>
  );
};

export default AdminSidebar;
