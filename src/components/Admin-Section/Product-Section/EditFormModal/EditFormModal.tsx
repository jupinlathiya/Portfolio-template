import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { addCategory, updateProduct } from "../../../../slices/productSlice";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage();
import style from "../Product-Form/style.module.css";
import { ImageUpload } from "../Image-Upload/ImageUpload";
import ModalLoader from "../../../Comman/Modal-Loader/ModalLoader";
import { toast } from "react-toastify";
const TextArea = Input.TextArea;
interface PropsType {
  setIsModalOpen: (x: boolean) => void;
  isModalOpen: boolean;
  productId: string;
}
interface ImageURL {
  dataURL: string;
}
interface ProductType {
  [key: string]: string;
}
function EditFormModal(props: PropsType) {
  let initialImg: string | null = null;
  const categories = useAppSelector((state) => state.product.categories);
  const { setIsModalOpen, isModalOpen, productId } = props;
  const [items, setItems] = useState<string[]>(categories);
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>();

  const [uniqueId, setUniqueId] = useState("");
  const [imageUrls, setImageurl] = useState("");
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setItems(categories);
  }, [categories]);
  const productList = useAppSelector((state) => state.product.productList);
  let filteredArray: ProductType[] = [];
  if (productList.length > 0) {
    filteredArray = productList.filter((data) => data.productId == productId);
    if (filteredArray.length > 0) {
      initialImg = filteredArray[0].Image;
    }
  }
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    let categoryExists = items.filter(
      (category) => category.toUpperCase() == name.toUpperCase()
    );

    if (categoryExists.length > 0) {
      toast.warning("Category already present");
      return;
    }
    setItems([...items, name]);
    dispatch(addCategory([...items, name]));

    setName("");
  };
  function geturls(array: ImageURL[]) {
    setImageurl(array[0].dataURL);
    initialImg = null;
  }

  const onFinish = (values: any) => {
    setLoading(true);
    let data;
    if (imageUrls == "") {
      data = {
        ...filteredArray[0],
        ...values,
        Image: initialImg,
      };
      setLoading(false);
      dispatch(updateProduct(data));
      form.resetFields();
      handleOk();
    } else {
      const storageRef = ref(storage, `Products/Edited ${uniqueId}`);
      uploadString(storageRef, imageUrls, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setLoading(false);
          data = {
            ...filteredArray[0],
            ...values,
            Image: downloadURL,
          };
          dispatch(updateProduct(data));
          form.resetFields();
          handleOk();
        });
      });
    }
  };
  const handleImageError = () => {
    setImageErr(false);
  };
  const onReset = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSelect = (e: string) => {
    const id = e.slice(0, 3);
    let uniqueNumber = Date.now().toString();
    setUniqueId(id.toUpperCase() + uniqueNumber.slice(-4));
  };

  const handleCancel = () => {
    onReset();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Edit Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={style.modal}
        footer={null}
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
            />
            {!imageUrls && (
              <img
                src={initialImg ?? imageUrls}
                className={style.prevImage}
                height={106}
              />
            )}
            <Form
              ref={formRef}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              initialValues={filteredArray.length > 0 && filteredArray[0]}
              layout="vertical"
            >
              <Form.Item
                name="productName"
                label="Product Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="productPrice"
                label="Product Price (INR)"
                rules={[
                  {
                    type: "number",
                    message:
                      "Please enter a valid number for the product price.",
                    transform: (value) => parseFloat(value),
                  },
                  {
                    validator: (_, value) => {
                      if (value >= 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Please enter a positive value for the product price."
                      );
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="productDescription"
                label="Product Description"
                rules={[{ required: true }]}
              >
                <TextArea rows={4} cols={4} />
              </Form.Item>
              <Form.Item
                name="productCategory"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ maxWidth: "100%" }}
                  onChange={handleSelect}
                  placeholder="Select category"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <input
                          name="productCategory"
                          id="productCategory"
                          placeholder="enter category"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        >
                          Add New
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
              <Form.Item>
                <div className={style.button_container}>
                  <Button
                    htmlType="submit"
                    className={style.button_modal_primary}
                  >
                    Edit
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    className={style.button_modal_secondary}
                  >
                    Close
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
}

export default EditFormModal;
