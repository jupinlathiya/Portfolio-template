import FormModal from "../../../components/Admin-Section/Home-Section/Modal/FormModal";
import PreviewTable from "../../../components/Admin-Section/Home-Section/Preview-Table/PreviewTable";
import ModalLoader from "../../../components/Comman/Modal-Loader/ModalLoader";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { fetchCarouselData } from "../../../slices/homeSlice";

import style from "../Admin-Home/style.module.css";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";

function HomeSection() {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.home.pending);

  if (pending) {
    return <ModalLoader />;
  }
  return (
    <>
      <AdminNavbarContainer />
      <div className={style.Container}>
        <div className={style.homeContainer}>
          <FormModal />
          <PreviewTable />
        </div>
      </div>
    </>
  );
}

export default HomeSection;
