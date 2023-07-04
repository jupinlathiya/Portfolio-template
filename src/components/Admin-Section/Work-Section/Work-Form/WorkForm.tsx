import { useRef, useState } from "react";
import style from "../Work-Form/style.module.css";
import { Button, Form, Input, Modal } from "antd";
const TextArea = Input.TextArea;

import { useAppDispatch } from "../../../../Hooks/Hooks";
import { ImageUpload } from "../../Product-Section/Image-Upload/ImageUpload";
import { addWork } from "../../../../slices/workSlice";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import ModalLoader from "../../../Comman/Modal-Loader/ModalLoader";
const storage = getStorage();

// Random Id generator
function idGenerator() {
  return Date.now().toString().slice(-4);
}
interface ImageUrl {
  dataURL: string;
}
interface FormDataType {
  WorkTitle: string;
  WorkDescription: string;
}
//Modal Component
const WorkFormModal = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [loading, setLoading] = useState<boolean>();
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageurl] = useState<ImageUrl[]>([]);

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

  function geturls(array: ImageUrl[]) {
    setImageurl(array);
  }
  function handleSubmit(values: FormDataType) {
    setLoading(true);
    if (images.length != 0) {
      setImageErr(false);
      let data = {
        workId: idGenerator(),
        workTitle: values.WorkTitle,
        workDesc: values.WorkDescription,
        Image: "",
      };
      const storageRef = ref(storage, `Wroks/${idGenerator()}`);
      uploadString(storageRef, imageUrls[0].dataURL, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setLoading(false);
          data = {
            ...data,
            Image: downloadURL,
          };
          dispatch(addWork(data));
          form.resetFields();
          setImages([]);
          handleOk();
        });
      });
    } else {
      setImageErr(true);
      setLoading(false);
    }
  }
  const onReset = () => {
    setImageErr(false);
    setImages([]);
    form.resetFields();
  };

  return (
    <>
      <div className={style.modal_button_container}>
        <button
          onClick={showModal}
          className={`${style.button_modal_primary} ${style.top_button}`}
        >
          Add New Work
        </button>
      </div>
      <Modal
        title="Add Work"
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
            <Form
              ref={formRef}
              layout="vertical"
              name="Work Form"
              onFinish={handleSubmit}
              style={{ maxWidth: 600 }}
              form={form}
            >
              <Form.Item
                name="WorkTitle"
                label="Work Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="WorkDescription"
                label="Work Description"
                rules={[{ required: true, max: 140 }]}
              >
                <TextArea rows={4} cols={4} />
              </Form.Item>
              <Form.Item>
                <div className={style.button_container}>
                  <Button
                    htmlType="submit"
                    className={style.button_modal_primary}
                  >
                    Add
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    className={style.button_modal_secondary}
                  >
                    Reset
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};
export default WorkFormModal;
