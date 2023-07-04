import React from "react";
import "../Theme-Card/style.css";
interface PropsType {
  primary: string;
  secondary: string;
  ternary: string;
  clickEvent: (name: string) => void;
  name: string;
}
function ThemeCard(props: PropsType) {
  let { primary, secondary, ternary, clickEvent, name } = props;

  return (
    <div className="Card_container" onClick={() => clickEvent(name)}>
      <div
        className="primary"
        style={{
          backgroundColor: `${secondary}`,
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        {name}
      </div>
      <div
        className="paper"
        style={{
          backgroundColor: `${ternary}`,
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        Text
      </div>
      <div
        className="background"
        style={{
          backgroundColor: `${primary}`,
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        <p>Background</p>
      </div>
    </div>
  );
}

export default ThemeCard;
