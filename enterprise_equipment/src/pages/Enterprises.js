import React, { useState, useEffect } from "react";
import data from "../jsons/EnterprisesData.json";
import EnterpriseItem from "./EnterpriseItem";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Enterprises.css";

const Enterprises = () => {
  const enterprises = useSelector((state) => state.enterprises);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [newEnterprise, setNewEnterprise] = useState({
    id: null,
    name: "",
    img: "",
    tools: [],
  });

  const handleAddEnterprise = () => {
    const newId = enterprises.length + 1;

    dispatch({
      type: "ADD_ENTERPRISE",
      payload: { ...newEnterprise, id: newId },
    });

    handleClose();
  };
  const handleDeleteEnterprise = (id) => {
    dispatch({ type: "DELETE_ENTERPRISE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "SET_ENTERPRISES", payload: data });
  }, [dispatch]);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить новое предприятие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEnterpriseName">
              <Form.Label>Название предприятия</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя предприятия..."
                value={newEnterprise.name}
                onChange={(e) =>
                  setNewEnterprise({ ...newEnterprise, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="Фотография предприятия...">
              <Form.Label>Фотография предприятия</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newEnterprise.img}
                onChange={(e) =>
                  setNewEnterprise({ ...newEnterprise, img: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formTools">
              <Form.Label>Инструменты</Form.Label>
              <Form.Control
                type="text"
                placeholder="Инструменты которыми пользуется предприятие...."
                value={newEnterprise.tools.map((tool) => tool.name).join(", ")}
                onChange={(e) => {
                  const toolNames = e.target.value
                    .split(", ")
                    .map((tool) => tool.trim());

                  const newTools = toolNames.map((name, index) => ({
                    id: 200 + index,
                    name: name,
                  }));

                  setNewEnterprise({
                    ...newEnterprise,
                    tools: newTools,
                  });
                }}
              />
            </Form.Group>

            <Button variant="success" onClick={handleAddEnterprise}>
              Добавить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="enterprises-container">
        {enterprises.map((enterprise) => (
          <EnterpriseItem
            key={enterprise.id}
            enterprise={enterprise}
            onDelete={handleDeleteEnterprise}
          />
        ))}
      </div>
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleShow}>
          Добавить новое предприятие
        </Button>
      </div>
    </>
  );
};

export default Enterprises;
