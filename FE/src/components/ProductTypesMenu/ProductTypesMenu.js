import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import {
  handleFilterProduct,
  handleSortProduct,
} from "@/redux-toolkit/productSlice";
import { PRICE_VALUE_FILTER_TO, PRICE_VALUE_FILTER_FORM } from "@/utils";
import "./ProductTypeMenu.scss";
import { convertSlugUrl } from "@/utils/commonUtils";

const ProductTypesMenu = ({ productTypes }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChangProductType = (productTypeId, productTypeName) => {
    dispatch(handleChangePage(1));
    dispatch(
      handleFilterProduct({
        brandId: [],
        price: [PRICE_VALUE_FILTER_FORM, PRICE_VALUE_FILTER_TO],
      })
    );
    dispatch(handleSortProduct(`["id", "DESC"]`));
    router.push(
      `/${convertSlugUrl(productTypeName)}-${productTypeId.toLowerCase()}`
    );
  };

  return (
    <>
      {productTypes.map((item, index) => {
        return (
          <div
            key={index}
            className="product-type-item"
            onClick={() =>
              handleChangProductType(item.productTypeId, item.productTypeName)
            }
          >
            <p>{item.productTypeName}</p>
          </div>
        );
      })}
    </>
  );
};

export default ProductTypesMenu;
