import React, { useState, useEffect } from "react";

const MemberForm = ({ member, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: member ? member.name : "",
    surname: member ? member.surname : "",
    phone: member ? member.phone : "",
    experience: member ? member.experience : "",
    img: member ? member.img : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    setFormData({
      name: member ? member.name : "",
      surname: member ? member.surname : "",
      phone: member ? member.phone : "",
      experience: member ? member.experience : "",
      img: member ? member.img : "",
    });
  }, [member]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Фамилия:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Телефон:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Опыт:
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Изображение URL:
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{member ? "Сохранить" : "Добавить"}</button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </form>
    </div>
  );
};

export default MemberForm;
