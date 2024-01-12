import React, { useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

const EmployeesItem = ({ employee, onDelete, onUpdate }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdatedEmployee({ ...employee });
  };

  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const handleUpdateEmployee = () => {
    onUpdate(updatedEmployee);

    handleCloseUpdateModal();
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th>Часовая оплата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.phone}</td>
            <td>${employee.hourlyRate}</td>
            <td>
              <Button
                variant="primary"
                className="ms-2"
                onClick={handleShowUpdateModal}
              >
                Изменить
              </Button>
              <br />
              <br />
              <Button
                variant="danger"
                className="ms-2"
                onClick={() => onDelete(employee.id)}
              >
                Удалить
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить работника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                value={updatedEmployee.firstName}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    firstName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите фамилию"
                value={updatedEmployee.lastName}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    lastName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите номер телефона"
                value={updatedEmployee.phone}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Часовая оплата</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите часовую оплату"
                value={updatedEmployee.hourlyRate}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    hourlyRate: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee}>
            Обновить данные
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeesItem;
