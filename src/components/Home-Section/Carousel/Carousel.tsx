import { Carousel } from "antd";
import style from "../Carousel/style.module.css";

import { useAppSelector } from "../../../Hooks/Hooks";

function Carousell() {
  const pending = useAppSelector((state) => state.home.pending);
  const allimages = useAppSelector((state) => state.home.allImages) ?? [];
  const imageToShow = allimages?.filter((x) => x.active == true);

  let images = imageToShow?.map((src) => {
    return (
      <div>
        <img src={src.image} className={style.Caro_img}></img>
      </div>
    );
  });
  if (images?.length == 0 && pending == false) {
    images = [
      <div>
        <h1 className={style.Caro_img} style={{ color: "wheat" }}>
          No Data
        </h1>
      </div>,
    ];
  }
  return (
    <>
      <Carousel autoplay className={style.carousel}>
        {images && images}
      </Carousel>
    </>
  );
}

export default Carousell;
