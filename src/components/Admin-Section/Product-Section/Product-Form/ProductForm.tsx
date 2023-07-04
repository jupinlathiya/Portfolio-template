import React, { useRef, useState } from "react";
import style from "../Product-Form/style.module.css";
import { Modal, Form, Input, Select, Button, Divider, Space } from "antd";
const { TextArea } = Input;
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ImageUpload } from "../Image-Upload/ImageUpload";
import {
  addCategory,
  addProduct,
  fetchCategories,
} from "../../../../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import ModalLoader from "../../../Comman/Modal-Loader/ModalLoader";
import { toast } from "react-toastify";
const storage = getStorage();
interface Datatype {
  productImage: File;
  productPrice: string;
  productId: string;
  productDescription: string;
  productCategory: string;
  productName: string;
  Image: string;
}
interface ImageUrl {
  dataURL: string;
}

//Modal Component
const ProductForm = () => {
  let categories = useAppSelector((state) => state.product.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<string[]>(categories);
  const [loading, setLoading] = useState<boolean>();

  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const formRef = useRef(null);
  const [imageUrls, setImageurl] = useState<ImageUrl[]>([]);
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const productList = useAppSelector((state) => state.product.productList);
  function geturls(array: ImageUrl[]) {
    setImageurl(array);
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  //showmodal
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

  const onFinish = (values: Datatype) => {
    setLoading(true);

    if (images.length != 0) {
      setImageErr(false);
      let data: Datatype;
      if (values.productPrice == undefined || values.productPrice == "") {
        data = {
          ...values,
          productPrice: "0",
          productId: uniqueId,
        };
      } else {
        data = {
          ...values,
          productId: uniqueId,
        };
      }

      if (productList) {
        const storageRef = ref(storage, `Products/${uniqueId}`);
        uploadString(storageRef, imageUrls[0].dataURL, "data_url").then(() => {
          getDownloadURL(storageRef).then((downloadURL) => {
            setLoading(false);

            data = {
              ...data,
              Image: downloadURL,
            };
            dispatch(addProduct(data));
            form.resetFields();
            setImages([]);
            handleOk();
            setFileList([]);
          });
        });
      }
    } else {
      setImageErr(true);
    }
  };

  const onReset = () => {
    setImages([]);
    setFileList([]);
    form.resetFields();
    handleImageError();
  };

  const handleSelect = (e: string) => {
    const id = e.slice(0, 3);
    let uniqueNumber = Date.now().toString();
    setUniqueId(id.toUpperCase() + uniqueNumber.slice(-4));
  };

  const handleImageError = () => {
    setImageErr(false);
  };

  return (
    <>
      <div className={style.modal_button_container}>
        <button
          onClick={showModal}
          className={`${style.button_modal} ${style.top_button}`}
        >
          Add Product
        </button>
      </div>

      <Modal
        title="Add Details"
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
              form={form}
              layout="vertical"
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
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
                    validator: (_, value) => {
                      if (value >= 0 || value == undefined) {
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
export default ProductForm;
