import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { selectProduct } from "../../../slices/productSlice";
import style from "../Cards/style.module.css";
interface PropsType {
  data: {
    productName: string;
    productId: string;
    Image: string;
  };
}
function ProductCard(props: PropsType) {
  const { data } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const imgSrc = data.Image;
  return (
    <>
      <div
        className={style.container}
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className={style.overlay}>
          <div className={style.head}>
            <p className={style.productName}>{data.productName}</p>
          </div>

          <div className={`${style.items} ${style.cart}`}>
            <span>
              <hr />
              <Button
                className={style.readMoreBtn}
                onClick={() => {
                  dispatch(selectProduct(data.productId));
                  navigate(`/products/${data.productId}`);
                }}
              >
                Read More
              </Button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
