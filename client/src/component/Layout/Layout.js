import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "85vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer></Footer>
    </>
  );
}
Layout.defaultProps = {
  title: "ecom app -shop now",
  author: "sujit",
  keywords: "node mern fullstack",
  description: "mern project",
};

export default Layout;
