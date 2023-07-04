import style from "../ProductContainer/style.module.css";
import ProductTitle from "../../components/Product-Section/Section-Title/ProductTitle";
import Navbar from "../../components/Product-Section/Navbar/Navbar";
import CardContainer from "../../components/Product-Section/CardContainer/CardContainer";
import { useAppDispatch } from "../../Hooks/Hooks";
import { useEffect } from "react";
import { fetchCategories, fetchProductsData } from "../../slices/productSlice";

export default function ProductContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCategories());
  },[]);
  return (
    <div className={style.ProductContainer}>
      <ProductTitle />
      <Navbar />
      <CardContainer />
    </div>
  );
}
