import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useAppSelector } from "../../../Hooks/Hooks";
import ProductCard from "../../Product-Section/Cards/ProductCard";
function Paginate({ itemsPerPage }) {
  const productList = useAppSelector((state) => state.product.productList);
  const [itemOffset, setItemOffset] = useState(0);

  const searchQuery = useAppSelector((state) => state.product.searchQuery);
  const searchedProducts = useAppSelector(
    (state) => state.product.searchedProducts
  );
  const filterCategory = useAppSelector(
    (state) => state.product.filteredCategory
  );

  let AllCards;
  let visibleProducts;
  if (filterCategory == "all") {
    visibleProducts = productList;
  } else {
    visibleProducts = productList.filter(
      (product) => product.productCategory == filterCategory
    );
  }

  let commonProduct = visibleProducts.filter(function (element) {
    return searchedProducts.includes(element);
  });
  if (searchQuery !== "") {
    AllCards = commonProduct.map((x) => {
      return <ProductCard data={x} />;
    });
  } else {
    AllCards = visibleProducts.map((x) => {
      return <ProductCard data={x} />;
    });
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = AllCards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(AllCards.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % AllCards.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default Paginate;
