import { useState } from "react";
import { Image, Space, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import style from "../Preview-Table/style.module.css";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import EditFormModal from "../EditFormModal/EditFormModal";
import uuid from "react-uuid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, showSection } from "../../../../slices/productSlice";

//Type Declaration
interface DataType {
  [key: string]: string;
}

function PreviewTable() {
  const showProductSection = useAppSelector(
    (state) => state.product.showProductSection
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandId, setExpandId] = useState<string>();
  const [productId, setProductId] = useState<string>("");
  const productList = useAppSelector((state) => state.product.productList);
  const [switchStatus, setSwitchStatus] = useState(showProductSection);
  const pending = useAppSelector((state) => state.product.pending);
  const dispatch = useAppDispatch();
  const columns: ColumnsType<DataType> = [
    {
      title: "Product Id",
      dataIndex: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      render: (text, record) => {
        return (
          <div>
            {expanded && record.productId == expandId ? (
              <div>{text}</div>
            ) : (
              <div className={style.ellipsisTwoLines}>{text}</div>
            )}
            {text.length > 50 && (
              <span
                className={style.readMoreLink}
                onClick={() => {
                  setExpandId(record.productId);
                  setExpanded(!expanded);
                }}
              >
                {expanded && record.productId == expandId ? (
                  <a style={{ color: "blue" }}>Read Less</a>
                ) : (
                  <a style={{ color: "blue" }}>Read More</a>
                )}
              </span>
            )}
          </div>
        );
      },
    },

    {
      title: "Product Category",
      dataIndex: "productCategory",
    },
    {
      title: "Product Image",
      dataIndex: "Image",
      render: (_, record) => (
        <Image
          width={150}
          src={record.Image}
          style={{ width: "", height: 120 }}
        />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <p
            className={style.action_update}
            onClick={() => {
              setIsModalOpen(true);
              setProductId(record.productId);
            }}
          >
            <svg
              className={`${style.svg_icon} ${style.edit}`}
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="20px"
              height="20px"
              viewBox="0 0 494.936 494.936"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                  />
                  <path
                    d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                  />
                </g>
              </g>
            </svg>
          </p>
          <p
            className={style.action_delete}
            onClick={() => {
              confirmAlert({
                title: "Deleting Product",
                message: "Are you sure to do this.",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => dispatch(deleteProduct(record.productId)),
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
                stroke=""
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
  const expandable = {
    expandedRowRender: (record: DataType) => (
      <div>{record.productDescription}</div>
    ),
  };
  return (
    <>
      <div className={style.table_header}>
        <div className={style.title}>Preview Table</div>
        {!pending && (
          <div className={style.switch}>
            <span>Show Section</span>{" "}
            <Switch
              style={{
                backgroundColor: showProductSection
                  ? "var(--color-secondary)"
                  : "gray",
              }}
              checked={showProductSection}
              checkedChildren="On"
              unCheckedChildren="Off"
              onChange={(e) => {
                setSwitchStatus(e);
                dispatch(showSection(e));
              }}
            />
          </div>
        )}
      </div>

      <EditFormModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        productId={productId}
        key={uuid()}
      />
      <div className={style.mainTableContainer}>
        <div className={style.tableContainer}>
          <Table
            className={style.table}
            columns={columns}
            loading={pending}
            dataSource={productList}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
}

export default PreviewTable;
