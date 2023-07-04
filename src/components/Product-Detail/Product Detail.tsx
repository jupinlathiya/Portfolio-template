import { useEffect, useState } from "react";
import { useAppSelector } from "../../Hooks/Hooks";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Comman/Loader/Loader";
import style from "../Product-Detail/style.module.css";
import { toast } from "react-toastify";
import ErrorPage from "../Comman/Error_Page/ErrorPage";
const ProductDetails = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams();
  const productList = useAppSelector((state) => state.product.productList);
  const [data] = productList.filter((product) => product.productId == id);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  });
  if (!data) {
    return <ErrorPage errorCode={"404"} errorMessage={"Data Not Found"} />;
  }
  function handleShare() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("URL Copied");
      })
      .catch((err) => toast(err.message));
  }
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (showFullDescription) {
      return data.productDescription;
    }
    const truncatedDescription = data.productDescription.slice(0, 300);
    return `${truncatedDescription}`;
  };

  const renderReadMoreButton = () => {
    if (data.productDescription.length > 100) {
      return (
        <button className={style.readMore} onClick={toggleDescription}>
          {showFullDescription ? "Read Less" : "Read More"}
        </button>
      );
    }
    return null;
  };
  return (
    <section className={style.section}>
      <div className={style.Container}>
        <div className={style.productContainer}>
          <img
            src={data.Image}
            style={{ maxHeight: "500px" }}
            className={`${style.img} ${showFullDescription ? "lg:w-full" : ""}`}
          />
          <div
            className={`${style.detailContainer} ${
              showFullDescription ? "lg:w-full" : ""
            }`}
          >
            <h2 className={style.id}>#ID:{data.productId}</h2>
            <h1 className={style.name}>{data.productName}</h1>
            <p className={style.desc}>
              {renderDescription()}
              {renderReadMoreButton()}
            </p>

            <div className={style.category}>
              <span className="">Category: {data.productCategory}</span>
              <button className={style.share} onClick={handleShare}>
                <svg
                  className={style.svg}
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 481.6 481.6"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="5.7792"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8 c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5 l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9 l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1 c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8 c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5 c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </button>
            </div>
            <div className="flex justify-between">
              {data.price !== "0" && (
                <span className={style.price}>Rs{data.productPrice}</span>
              )}

              <button
                className={style.button_primary}
                onClick={() => navigate("/")}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
