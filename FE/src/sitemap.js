import { handleGetAllProductTypeService } from "@/services/productService";
import { convertSlugUrl } from "./utils/commonUtils";

let getAllProductType = async () => {
  try {
    let res = await handleGetAllProductTypeService("", "", "", false);
    if (res && res.errCode === 0) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function sitemap() {
  const productTypes = await getAllProductType();
  const productTypesURL = productTypes.map((product) => ({
    url: `${process.env.FRONTEND_URL}/${convertSlugUrl(
      product.productTypeName
    )}-${product.productTypeId.toLowerCase()}/sitemap.xml`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [...productTypesURL];
}
