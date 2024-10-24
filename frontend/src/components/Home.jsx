import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price] = useState([1, 100000]);

  let { keyword } = useParams();

  const notify = (error = "") => toast.error(error);

  useEffect(() => {
    if (error) {
      notify(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, error, currentPage, keyword, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;

  if (keyword) {
    let count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="bg-[rgba(81,67,139,0.5)] pt-3">
            <section id="products" className="container">
              <div className="row">
                <Fragment>
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </Fragment>
              </div>
            </section>

            {/* MAY PROBLEMA SA PAGINATION */}
            {/* {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )} */}
            <br />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
