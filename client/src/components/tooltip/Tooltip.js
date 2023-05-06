import { useState } from "react";
import "./styles.scss";

const Tooltip = ({ text, children }) => {
  // INFORMATIVE TEXT/MESSAGE BOX

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;
