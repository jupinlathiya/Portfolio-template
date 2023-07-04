import { useEffect, useState } from "react";
import ContactContainer from "../ContactContainer/ContactContainer";
import FooterContainer from "../FooterContainer/FooterContainer";
import HomeContainer from "../HomeContainer/HomeContainer";
import NavbarContainer from "../navbarContainer/NavbarContainer";
import ProductContainer from "../ProductContainer/ProductContainer";
import WorkContainer from "../WorkContainer/WorkContainer";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import Loader from "../../components/Comman/Loader/Loader";

function PortfolioContainer() {
  const showProductSection = useAppSelector(
    (state) => state.product.showProductSection
  );
  const homeDataPending = useAppSelector((state) => state.home.pending);
  const contactDataPending = useAppSelector((state) => state.contact.pending);
  const showWorkSection = useAppSelector((state) => state.work.showWorkSection);

  useEffect(() => {
    let themeValue = localStorage.getItem("theme");
    if (!themeValue || themeValue == "maroon") {
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", themeValue);
    }
  }, []);
  if (contactDataPending || homeDataPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <NavbarContainer />
      <div id="homeSection">
        <HomeContainer />
      </div>
      {showProductSection && (
        <div id="productSection">
          <ProductContainer />
        </div>
      )}
      {showWorkSection && (
        <div id="workSection">
          <WorkContainer />
        </div>
      )}
      <div id="contactSection">
        <ContactContainer />
      </div>
      <FooterContainer />
    </div>
  );
}

export default PortfolioContainer;
