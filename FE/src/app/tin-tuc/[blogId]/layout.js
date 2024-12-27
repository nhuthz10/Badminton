import { handleGetBlogService } from "@/services/blogService";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const temp = params?.blogId?.split("-") ?? [];
  const blogId = temp[temp.length - 1];

  const headersList = headers();
  const domain = headersList.get("host") || "";
  const header_url = headersList.get("x-url") || "";

  let res;
  try {
    res = await handleGetBlogService(blogId);
  } catch (error) {
    console.log(error?.response?.data?.message);
  }

  return {
    title: `${res?.data?.title} | Bamito`,
    description: res?.data?.description,
    openGraph: {
      title: res?.data?.title,
      description: res?.data?.description,
      url: header_url,
      siteName: domain,
      images: [
        {
          url: res?.data?.image,
        },
      ],
    },
  };
}

export default function BlogDetailLayout({ children }) {
  return <>{children}</>;
}
