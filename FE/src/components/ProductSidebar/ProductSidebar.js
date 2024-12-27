import Slider from "@mui/material/Slider";
import "./ProductSidebar.scss";
import { useEffect, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const ProductSidebar = ({
  type,
  brands,
  priceValue,
  handleChangePrice,
  handleCheckBrands,
  checkBrands,
}) => {
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    if (brands) {
      let newBrand = [...brands];
      newBrand = brands?.map((brand) => {
        if (checkBrands.includes(brand?.brandId)) {
          return { ...brand, checked: true };
        }
        return { ...brand, checked: false };
      });
      setBrandsData(newBrand);
    }
  }, [checkBrands, brands]);

  return (
    <div
      className="product-sidebar-container"
      style={{
        width: type === "drawer" ? "none" : "22rem",
        height: type === "drawer" ? "none" : "65rem",
        marginRight: type === "drawer" ? "none" : "2rem",
        border: type === "drawer" ? "none" : "0.2rem solid var(--gray-color)",
      }}
    >
      <div className="sidebar-item">
        <h1 className="sidebar-item-title">Thương hiệu</h1>
        <div className="sidebar-line"></div>
        {brandsData &&
          brandsData.length > 0 &&
          brandsData.map((item, index) => {
            return (
              <div className="sidebar-content" key={index}>
                <p>{item.brandName}</p>
                <input
                  checked={item.checked || false}
                  type="checkbox"
                  value={item.brandId}
                  onChange={handleCheckBrands}
                ></input>
              </div>
            );
          })}
      </div>
      <div className="sidebar-item">
        <h1 className="sidebar-item-title">Mức giá</h1>
        <div className="sidebar-line"></div>
        <Slider
          getAriaLabel={() => "Default"}
          valueLabelDisplay="off"
          step={500000}
          value={priceValue}
          onChange={handleChangePrice}
          min={0}
          max={10000000}
          className="price-slider"
          style={{ color: "var(--second-color)" }}
        />
        <div className="price-slider-value">
          <span>{currencyFormatter.format(priceValue[0])}</span>
          <span>{currencyFormatter.format(priceValue[1])}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
