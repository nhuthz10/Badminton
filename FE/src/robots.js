export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/user/*"],
    },
    sitemap: [`${process.env.FRONTEND_URL}/sitemap.xml`],
  };
}
