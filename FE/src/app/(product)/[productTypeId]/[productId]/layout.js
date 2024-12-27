import { handleGetProductService } from "@/services/productService";
import { headers } from "next/headers";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const truncateString = (str, num) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + "...";
};

var res;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: res?.data?.name,
  image: res?.data?.image,
  description: res?.data?.name,
};

export async function generateMetadata({ params }) {
  const temp = params?.productId?.split("-") ?? [];
  const productId = temp[temp.length - 1];

  const headersList = headers();
  const domain = headersList.get("host") || "";
  const header_url = headersList.get("x-url") || "";

  try {
    res = await handleGetProductService(productId);
  } catch (err) {
    console.log(err?.response?.data?.message);
  }

  return {
    title: `${res?.data?.name} | Bamito`,
    description: truncateString(res?.data?.descriptionContent, 250),
    openGraph: {
      title: res?.data?.name,
      description:
        res?.data?.name +
        " " +
        currencyFormatter.format(res?.data?.price) +
        " VNĐ",
      url: header_url,
      siteName: domain,
      images: [
        {
          url: res?.data?.image,
        },
      ],
      type: "website",
      locale: "vn",
    },
  };
}

export default function ProductTypeLayout({ children }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
