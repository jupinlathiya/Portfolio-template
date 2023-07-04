import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "../Navbar/style.module.css";
import {
  changeFilterCategory,
  searchProduct,
} from "../../../slices/productSlice";

import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useEffect, useState } from "react";
import useDebounce from "../../../Hooks/useDebounce";
import SelectMenu from "../../Comman/Select-Menu/SelectMenu";
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("All");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const dispatch = useAppDispatch();
  let categories = useAppSelector((state) => state.product.categories);

  function getFilterBy(value: string) {
    dispatch(changeFilterCategory(value));
    setFilterBy(value);
  }

  useEffect(() => {
    dispatch(
      searchProduct({
        searchquery: debouncedSearchQuery,
      })
    );
  }, [debouncedSearchQuery]);
  return (
    <div className={style.Product_Navbar_container}>
      <div className={style.searchSection}>
        <div className={style.searchbar}>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search Your Products"
          ></input>
          <button className={style.searchButton}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={style.searchIcon}
            />
          </button>
        </div>
      </div>
      <div className={style.category_selectMenu}>
        <SelectMenu
          options={["All", ...categories]}
          filterBy={getFilterBy}
          initialValue="All"
        />
      </div>
    </div>
  );
}
