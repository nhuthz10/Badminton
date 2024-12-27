import { handleGetProductTypeService } from "@/services/productService";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const temp = params?.productTypeId?.split("-") ?? [];
  const productTypeId = temp[temp.length - 1];

  const headersList = headers();
  const domain = headersList.get("host") || "";
  const header_url = headersList.get("x-url") || "";

  let res;
  try {
    res = await handleGetProductTypeService(productTypeId);
  } catch (err) {
    console.log(err?.response?.data?.message);
  }

  return {
    title: `${res?.data?.productTypeName} | Bamito`,
    description: res?.data?.productTypeName,
    openGraph: {
      title: res?.data?.productTypeName,
      description: res?.data?.productTypeName,
      url: header_url,
      siteName: domain,
      images: [
        {
          url: "https://res.cloudinary.com/daphxc3ye/image/upload/v1719301372/Badminton/home_page_vpq2yc.png",
        },
      ],
    },
  };
}

export default function ProductTypeLayout({ children }) {
  return <>{children}</>;
}
