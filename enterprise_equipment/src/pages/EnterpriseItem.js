import React, { useEffect } from "react";
import PopupMenu from "../components/PopupMenu";
import "../styles/EnterpriseItem.css";

const EnterpriseItem = ({ enterprise, onDelete }) => {
  useEffect(() => {
    console.log(enterprise);
  }, []);

  const handleDelete = () => {
    onDelete(enterprise.id);
  };

  return (
    <div className="enterprise-item">
      <h4 className="enterprise-name">{enterprise.name}</h4>
      <img
        className="enterprise-img"
        src={enterprise.img}
        alt={`${enterprise.name} Image`}
      />
      <PopupMenu
        item={<button className="details-button">Подробнее</button>}
        popupContent={
          <div>
            <img
              className="enterprise-img-popup"
              src={enterprise.img}
              alt={`${enterprise.name} Image`}
            />
            <h4>Предприятие содержит следующие инструменты: </h4>
            <ul className="tool-list">
              {enterprise.tools.map((tool) => (
                <li key={tool.id} className="tool-item">
                  {tool.name}
                </li>
              ))}
            </ul>
            <button onClick={handleDelete} className="delete-button">
              Удалить предприятие
            </button>
          </div>
        }
      />
    </div>
  );
};

export default EnterpriseItem;
