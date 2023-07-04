import { useEffect, useState } from "react";
import { useAppSelector } from "../../../Hooks/Hooks";
import Loader from "../../Comman/Loader/Loader";
import style from "../CardContainer/style.module.css";
import ProductCard from "../Cards/ProductCard";
import ReactPaginate from "react-paginate";

import { Col, Row } from "antd";

function CardContainer() {
  const productList = useAppSelector((state) => state.product.productList);
  const searchQuery = useAppSelector((state) => state.product.searchQuery);
  const [currentPage, setCurrentPage] = useState(0);
  const searchedProducts = useAppSelector(
    (state) => state.product.searchedProducts
  );
  let loading = useAppSelector((state) => state.product.pending);
  const filterCategory = useAppSelector(
    (state) => state.product.filteredCategory
  );
   useEffect(()=>{
setCurrentPage(0);
   },[filterCategory,searchQuery])

  const itemsPerPage = 6;

  let visibleProducts;
  if (filterCategory === "All") {
    visibleProducts = productList;
  } else {
    visibleProducts = productList.filter(
      (product) => product.productCategory === filterCategory
      );
    }
    
    let filteredProducts = visibleProducts;
  if (searchQuery !== "") {
    filteredProducts = visibleProducts.filter((product) =>
      searchedProducts.includes(product)
    );
  }

  // Calculate pagination
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    const productSection = document.getElementById("productSection");
    if (productSection) {
      window.scrollTo({
        top: productSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  console.log(currentProducts);

 
  return (
    <>
      <div className={style.cardContainer}>
        {loading && (
          <div className={style.loader}>
            <Loader />
          </div>
        )}
        {!loading && !currentProducts.length ? (
          <h1 className={style.loader}>No Data Found</h1>
        ) : (
          <>
            <Row gutter={[36, 36]}>
              {currentProducts.map((product) => (
                <Col xs={24} xl={8} sm={12}>
                  <ProductCard key={product.id} data={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
      <ReactPaginate
        className={style.paginate}
        previousLabel={
          <a href="#productSection">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className={style.nav_svg}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        }
        nextLabel={
          <a href="#productSection">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className={style.nav_svg}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        }
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        forcePage={currentPage}
        onPageChange={handlePageChange}
        activeClassName={style.active}
      />
    </>
  );
}

export default CardContainer;
