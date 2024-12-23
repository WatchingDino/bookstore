import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price] = useState([1, 100000]);
  let { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, currentPage, keyword, price]);

  // ================ NAVIGATE PRODUCTS SECTION | BREADCRUMBS ================

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/products") {
  //     const productsSection = document.getElementById("products");
  //     if (productsSection) {
  //       productsSection.scrollIntoView({ behavior: "smooth" });
  //     }
  //     navigate("/");
  //   }
  // }, [location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === "/products") {
      const timeoutScroll = setTimeout(() => {
        const productsSection = document.getElementById("products");
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);

      const timeoutNavigate = setTimeout(() => {
        navigate("/");
      }, 300);

      return () => {
        clearTimeout(timeoutScroll);
        clearTimeout(timeoutNavigate);
      };
    }
  }, [location.pathname, navigate]);

  // =============================================

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="bg-nbLightTheme pt-4">
            <section id="search" className="max-w-[80%] mx-auto">
              <div className="container shadow bg-white rounded h-[40px] flex justify-center items-center">
                Search
              </div>
            </section>
            <section id="carousel" className="max-w-[80%] mx-auto">
              <div className="container shadow bg-white rounded h-[320px] mt-3 flex justify-center items-center">
                Image Carousel
              </div>
            </section>
            <section id="products" className="container px-24 pt-2">
              <div className="row">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </section>
            <br />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
