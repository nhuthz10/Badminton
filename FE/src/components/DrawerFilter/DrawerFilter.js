import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { useDispatch } from "react-redux";
import ProductSidebar from "../ProductSidebar/ProductSidebar";
import "./DrawerFiter.scss";

const DrawerFiter = ({
  isOpenDrawer,
  setIsOpenDrawer,
  brands,
  priceValue,
  checkBrands,
  handleChangePrice,
  handleCheckBrands,
}) => {
  const toggleDrawer = (newOpen) => () => {
    setIsOpenDrawer(newOpen);
  };

  return (
    <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)} anchor="right">
      <div className="drawer-filter-container">
        <ProductSidebar
          type={"drawer"}
          brands={brands}
          priceValue={priceValue}
          handleChangePrice={handleChangePrice}
          handleCheckBrands={handleCheckBrands}
          checkBrands={checkBrands}
        ></ProductSidebar>
      </div>
    </Drawer>
  );
};

export default DrawerFiter;
