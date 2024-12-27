"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaginatedItems from "@/components/Pagination/Pagination";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/commonUtils";
import Image from "next/image";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/commonUtils";
import "./page.scss";

const BlogPage = () => {
  const [paginationData, setPaginationData] = useState([]);
  const blogPagination = useSelector((state) => state.blog?.allBlog?.data);

  useEffect(() => {
    setPaginationData(blogPagination);
  }, [blogPagination]);

  return (
    <div className="blog-page-container">
      <ThemeProvider theme={theme}>
        <Grid
          container
          rowSpacing={{ xl: 2.5, lg: 2.5, md: 2.5, sm: 2.5, xs: 2.5 }}
          columnSpacing={{ xl: 2.5, lg: 2.5, md: 2.5, sm: 2.5, xs: 2.5 }}
        >
          {paginationData && paginationData?.length > 0 ? (
            paginationData?.map((item, index) => {
              return (
                <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={index}>
                  <Link
                    href={`/tin-tuc/${convertSlugUrl(item.title)}-${item.id}`}
                    className="blog-item"
                  >
                    <Image
                      src={item.image}
                      sizes="100vw"
                      height={0}
                      width={0}
                      className="blog-poster"
                    ></Image>
                    <h5 className="blog-title">{item.title}</h5>
                    <p className="blog-des">{item.description}</p>
                  </Link>
                </Grid>
              );
            })
          ) : (
            <div className="no-product">
              <h1>Không có bài viết nào</h1>
              <Image
                src="/images/noProduct.png"
                height={315}
                width={315}
                sizes="100vw"
                alt=":(("
              />
            </div>
          )}
        </Grid>
      </ThemeProvider>

      <div style={{ marginTop: 50 }}>
        <PaginatedItems type={"blog"} />
      </div>
    </div>
  );
};

export default BlogPage;
