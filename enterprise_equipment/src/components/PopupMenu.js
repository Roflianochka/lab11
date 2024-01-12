import React, { useState } from "react";
import "./../styles/popupMenu.css";

const PopupMenu = ({ item, popupContent }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="popup-container">
      {React.cloneElement(item, { onClick: togglePopup })}
      {isPopupOpen && (
        <div className="popup">
          {popupContent}
          <button className="popup-close-btn" onClick={togglePopup}>
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
