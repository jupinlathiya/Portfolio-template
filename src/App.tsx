import "./App.css";
import RouteComponent from "./Routes/RouteComponent";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./Hooks/Hooks";
import { fetchCategories, fetchProductsData } from "./slices/productSlice";
import { fetchCarouselData } from "./slices/homeSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWorkData } from "./slices/workSlice";
import { fetchContactData } from "./slices/contactSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCategories());
    dispatch(fetchCarouselData());
    dispatch(fetchContactData());
    dispatch(fetchWorkData());
  }, []);

  return (
    <>
      <>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <RouteComponent />
      </>
    </>
  );
}

export default App;
