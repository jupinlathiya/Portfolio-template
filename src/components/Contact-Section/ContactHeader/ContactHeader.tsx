import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../ContactHeader/style.module.css";
interface ContactDetails {
  ["Portfolio Name"]:string,
  Address:string,
  Email:string,
  ["Instagram Url"]:string,
  ["Facebook Url"]:string,
  ["Twitter Url"]:string,
  ["Recieve Email"]:boolean,
  ["Recieve Whatsapp"]:boolean,
  ["Whatsapp Number"]:string,
  ["Phone Number"]:string,

  isNumberDifferent:boolean,
}
function ContactHeader() {
  const currentDomain = window.location.hostname;
  const data:ContactDetails = useAppSelector((state) => state.contact.contactDetails);
  const whatappLink:string = `https:/wa.me/+91${data["Whatsapp Number"]}`;
  return (
    <div
      className={
        data.isNumberDifferent
          ? style.headerContainer_4
          : style.headerContainer_3
      }
    >
      <div className={style.card}>
        <div className={style.icon}>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </a>
        </div>
        <div className={style.details}>
          <div className={style.title}>OUR LOCATION</div>
          <div className={style.information}>{data.Address}</div>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.icon}>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </a>
        </div>
        <div className={`${style.details} `}>
          <div className={style.title}>SEND E-MAIL</div>
          <div className={style.information}>{data.Email}</div>
        </div>
      </div>
      {data.isNumberDifferent && (
        <div className={style.card}>
          <div className={style.icon}>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </a>
          </div>
          <div className={style.details}>
            <div className={style.title}>CONTACT US</div>
            <div className={style.information}>{data["Phone Number"]}</div>
          </div>
        </div>
      )}

      <div className={`${style.card} ${style.spanFull}`}>
        <div className={style.icon}>
          <a onClick={() => window.open(whatappLink)} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={style.icon}
              viewBox="0 0 512 512"
            >
              <path
                d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"
                fillRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className={style.details}>
          <div className={style.title}>CONTACT US</div>
          <div className={style.information}>{data["Whatsapp Number"]}</div>
        </div>
      </div>
    </div>
  );
}

export default ContactHeader;
