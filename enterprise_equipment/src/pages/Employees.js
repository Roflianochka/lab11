import React, { useState, useEffect } from "react";
import EmployeesItem from "../pages/EmployeesItem";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
const Employees = () => {
  const token = localStorage.getItem("token");
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    hourlyRate: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    if (employeeId) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/employees/${employeeId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        dispatch({ type: "DELETE_EMPLOYEE", payload: employeeId });
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee");
      }
    }
  };
  const generateExcel = () => {
    const data = employees.map((employee) => ({
      Имя: employee.firstName,
      Фамилия: employee.lastName,
      Телефон: employee.phone,
      "Часовая оплата": employee.hourlyRate,
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Отчет");

    writeFile(wb, "report.xlsx");
  };
  const generatePDF = () => {
    const pdf = new jsPDF();
    employees.forEach((employee, index) => {
      const y = calculateYPosition(index);

      setPdfFont(pdf);
      setPdfFontSize(pdf);
      writeEmployeeInfo(pdf, employee, y);
    });

    savePdf(pdf, "report.pdf");
  };

  const calculateYPosition = (index) => {
    return index * 60 + 10;
  };

  const setPdfFont = (pdf) => {
    pdf.setFont("times");
  };

  const setPdfFontSize = (pdf) => {
    pdf.setFontSize(12);
  };

  const writeEmployeeInfo = (pdf, employee, y) => {
    pdf.text(20, y + 10, `Name: ${employee.firstName}`);
    pdf.text(20, y + 20, `Surname: ${employee.lastName}`);
    pdf.text(20, y + 30, `Phone: ${employee.phone}`);
    pdf.text(20, y + 40, `Hourly Rate: ${employee.hourlyRate}`);
  };

  const savePdf = (pdf, filename) => {
    pdf.save(filename);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    if (updatedEmployee.id) {
      try {
        const response = await axios.put(
          `http://localhost:5000/employees/${updatedEmployee.id}`,
          {
            updatedEmployee,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        dispatch({ type: "UPDATE_EMPLOYEE", payload: updatedEmployee });
      } catch (error) {
        console.error("Error updating employee:", error);
        toast.error("Failed to update employee"); // Добавлено
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      const jsonData = response.data;
      dispatch({ type: "SET_EMPLOYEES", payload: jsonData });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch employees"); // Добавлено
    }
  };
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewEmployee({
      id: null,
      firstName: "",
      lastName: "",
      phone: "",
      hourlyRate: "",
    });
  };

  const handleAddEmployee = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newEmployee),
      });
      console.log(newEmployee);
      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const employee = await response.json();

      dispatch({
        type: "ADD_EMPLOYEE",
        payload: employee,
      });

      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding employee:", error.message);
      toast.error("Error adding a new employee. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="equipmentPage-container">
        {employees.map((employee) => (
          <EmployeesItem
            key={employee.id}
            employee={employee}
            onDelete={handleDeleteEmployee}
            onUpdate={handleUpdateEmployee}
          />
        ))}
        <Button variant="success" className="mb-3" onClick={handleShowAddModal}>
          Добавить работника
        </Button>
        <Button variant="primary" className="mb-3" onClick={generateExcel}>
          Отчет в Exel
        </Button>
        <Button variant="primary" className="mb-3" onClick={generatePDF}>
          Отчет в PDF
        </Button>

        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить работника</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
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
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
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
                  value={newEmployee.phone}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
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
                  value={newEmployee.hourlyRate}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      hourlyRate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddEmployee}>
              Добавить работника
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default Employees;
