import { useState } from "react";
import { Image, Space, Table } from "antd";
import { Modal } from "antd";
import style from "../Preview-Table/style.module.css";
import type { ColumnsType } from "antd/es/table";
import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { deleteImage, updateState } from "../../../../slices/homeSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
//Type Declaration
interface DataType {
  imageId: string;
  image: string;
  active: boolean;
}

//Preview Component
function PreviewTable() {
  const pending = useAppSelector((state) => state.home.pending);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalimg, setModalimg] = useState<string>();
  const data = useAppSelector((state) => state.home.allImages);
  const dispatch = useAppDispatch();
  const onChange = (checked: boolean, id: string) => {
    dispatch(updateState({ checked, id }));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Image Id",
      dataIndex: "imageId",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (_, record) => (
        <Image
          width={100}
          height={70}
          className={style.table_img}
          src={record.image}
        />
      ),
    },
    {
      title: "Show/Hide",
      render: (_, record) => (
        <Space size="middle">
          <Switch
            style={{
              backgroundColor: record.active
                ? "var(--color-secondary)"
                : "gray",
            }}
            checked={record.active}
            onChange={(checked) => {
              onChange(checked, record.imageId);
            }}
          />
        </Space>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <p
            className={style.action_link}
            onClick={() => showModal(record.image)}
          ></p>
          <p
            className={style.action_link_delete}
            onClick={() => {
              confirmAlert({
                title: "Deleting Image",
                message: "Are you sure to do this.",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      dispatch(deleteImage(record.imageId));
                    },
                  },
                  {
                    label: "No",
                    onClick: () => {},
                  },
                ],
              });
            }}
          >
            <svg
              className={`${style.svg_icon} ${style.delete}`}
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
        </Space>
      ),
    },
  ];
  //Show Modal Function
  const showModal = (url: string) => {
    setModalimg(url);
    setIsModalOpen(true);
  };
  //HandleOk funtion for Modal
  const handleOk = () => {
    setIsModalOpen(false);
  };
  //Close Modal Function
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={style.title}>Preview Table</div>
      <Modal
        title="Image"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={style.modal}
        footer={null}
      >
        <img src={modalimg}></img>
      </Modal>
      <div className={style.mainTableContainer}>
        <div className={style.tableContainer}>
          <Table
            className={style.table}
            columns={columns}
            dataSource={data}
            loading={pending}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
}

export default PreviewTable;
