import WorkFormModal from "../../../components/Admin-Section/Work-Section/Work-Form/WorkForm";
import style from "../Admin-OurWork/style.module.css";
import PreviewTable from "../../../components/Admin-Section/Work-Section/Preview-Table/PreviewTable";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import { useAppSelector } from "../../../Hooks/Hooks";
import ModalLoader from "../../../components/Comman/Modal-Loader/ModalLoader";
function AdminOurWorkContainer() {
  const pending = useAppSelector((state) => state.work.pending);
  if (pending) {
    return <ModalLoader></ModalLoader>;
  }
  return (
    <>
      <AdminNavbarContainer />
      <div className={style.Container}>
        <div className={style.workContainer}>
          <WorkFormModal />
          <PreviewTable />
        </div>
      </div>
    </>
  );
}

export default AdminOurWorkContainer;
