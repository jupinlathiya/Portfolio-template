import { useState } from "react";

import ImageUploading, { ImageListType } from "react-images-uploading";
import style from "../Image-Upload/style.module.css";
// interface PropsType {
//   images: ImageListType;
//   setImages: () => void;
//   handleImageError: () => void;
//   imageError: boolean;
// }
export const ImageUpload = (props: PropsType) => {
  const { images, setImages, handleImageError, imageError } = props;

  const [error, setError] = useState<string | null>(null);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType) => {
    if (imageList.length != 0) {
      handleImageError();
    }
    setError("");
    setImages(imageList);
    props.geturl(imageList, error);
    setImages(imageList as never[]);
  };

  return (
    <div className="App">
      {error && <div className={style.error}>{error}</div>}

      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        acceptType={["jpg", "jpeg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          dragProps,
        }) => (
          <>
            <div className={style.UploadWrapper}>
              {!images.length && (
                <div
                  className={style.UploadButton}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <div className={style.uploadIcon}>
                    <p className={style.uploadText}>
                      Upload{" "}
                      <svg
                        style={{ display: "inline" }}
                        fill="#000000"
                        width="15px"
                        height="15px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3.793V9H7V3.864L5.914 4.95 4.5 3.536 8.036 0l.707.707.707.707 2.121 2.122-1.414 1.414L9 3.793zM16 11v5H0v-5h2v3h12v-3h2z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </p>
                    <p className={style.instruction}>
                      (Allowed Format: JPG,JPEG,PNG)
                    </p>
                  </div>
                  {imageError && (
                    <div className={style.errorMessage}>Image is Required</div>
                  )}
                </div>
              )}
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.dataURL}
                    className={style.image}
                    alt=""
                    height="100"
                    width="300"
                  />
                  <div className={style.buttonWrapper}>
                    <button
                      className={style.actionButton}
                      onClick={() => onImageUpdate(index)}
                    >
                      {/* <EditFilled /> */}
                      <svg
                        fill="#000000"
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
                    </button>
                    <button
                      className={style.actionButton}
                      onClick={() => onImageRemove(index)}
                    >
                      {/* <DeleteFilled /> */}
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </ImageUploading>
    </div>
  );
};
