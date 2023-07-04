import { useState } from "react";
import style from "../Modal/style.module.css";
import { Button, Modal } from "antd";

import { useAppDispatch } from "../../../../Hooks/Hooks";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage();

import { addImage } from "../../../../slices/homeSlice";
import { ImageUpload } from "../../Product-Section/Image-Upload/ImageUpload";
import ModalLoader from "../../../Comman/Modal-Loader/ModalLoader";
interface ImageURL {
  dataURL: string;
}
// Random Id generator
function idGenerator() {
  return Date.now().toString().slice(-4);
}
//Modal Component
const FormModal = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState<boolean>();

  const [imageUrl, setImageurl] = useState<ImageURL[]>([]);

  const handleImageError = () => {
    setImageErr(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  //handleOk function of modal
  const handleOk = () => {
    setIsModalOpen(false);
  };
  // handle cancel button of modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function geturls(array: ImageURL[]) {
    setImageurl(array);
  }
  async function handleSubmit() {
    setLoading(true);
    let firebaseImgUrl = "";
    let data = {
      imageId: idGenerator(),
      active: true,
      image: "",
    };
    if (images.length != 0) {
      setImageErr(false);
      const storageRef = ref(storage, `images/${idGenerator()}`);
      uploadString(storageRef, imageUrl[0].dataURL, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          firebaseImgUrl = downloadURL;
          setLoading(false);
          data = {
            ...data,
            image: firebaseImgUrl,
          };
          dispatch(addImage(data));

          setImages([]);
          handleOk();
        });
      });
    } else {
      setLoading(false);
      setImageErr(true);
    }
  }
  const onReset = () => {
    setImageErr(false);
    setImages([]);
  };

  return (
    <>
      <div className={style.modal_button_container}>
        <button
          onClick={showModal}
          className={`${style.button_modal_primary} ${style.top_button}`}
        >
          Add Image
        </button>
      </div>
      <Modal
        title="Upload Image"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
      >
        {loading ? (
          <>
            <ModalLoader />
          </>
        ) : (
          <>
            <ImageUpload
              geturl={geturls}
              images={images}
              setImages={setImages}
              handleImageError={handleImageError}
              imageError={imageErr}
            />

            <div className={style.button_container}>
              <Button
                htmlType="submit"
                onClick={handleSubmit}
                className={style.button_modal_primary}
              >
                Add
              </Button>
              <Button
                htmlType="reset"
                className={style.button_modal_secondary}
                onClick={onReset}
              >
                Reset
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
export default FormModal;
