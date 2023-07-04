import { useEffect } from "react";

import Carousell from "../../components/Work-Section/Carousel/Carousell";
import WorkTitle from "../../components/Work-Section/Section-Title/WorkTitle";
import { useAppDispatch } from "../../Hooks/Hooks";
import { fetchWorkData } from "../../slices/workSlice";
import style from "../WorkContainer/style.module.css";
function WorkContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchWorkData());
    };
    fetch();
  }, []);

  return (
    <div className={style.workContainer}>
      <WorkTitle />
      <Carousell />
    </div>
  );
}

export default WorkContainer;
