import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/actions";

const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    nickname: "",
    email: "",
    bio: "",
    password: "",
  });

  const [isRegistration, setIsRegistration] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (isRegistration) {
      if (!formData.fullname.trim()) {
        errors.fullname = "Fullname is required";
      }

      if (!formData.nickname.trim()) {
        errors.nickname = "Nickname is required";
      }

      if (!formData.bio.trim()) {
        errors.bio = "Bio is required";
      }
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistration) {
        if (validateForm()) {
          console.log("Registration submitted:", formData);
          const response = await fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        }
      } else {
        const response = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("token", data);
          dispatch(
            setUser(
              formData.fullname,
              formData.nickname,
              formData.email,
              formData.bio
            )
          );
          console.log("Вы успешно вошли", data);
        } else alert("Вы ввели неправильные данные!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form>
            {isRegistration && (
              <>
                <Form.Group controlId="formFullname">
                  <Form.Label>Фио</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Введите свое полное имя..."
                    value={formData.fullname}
                    onChange={handleChange}
                    isInvalid={!!formErrors.fullname}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.fullname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formNickname">
                  <Form.Label>Никнейм</Form.Label>
                  <Form.Control
                    type="text"
                    name="nickname"
                    placeholder="Введите свой никнейм..."
                    value={formData.nickname}
                    onChange={handleChange}
                    isInvalid={!!formErrors.nickname}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.nickname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBio">
                  <Form.Label>О себе...</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    placeholder="Введите информацию о себе..."
                    value={formData.bio}
                    onChange={handleChange}
                    isInvalid={!!formErrors.bio}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.bio}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!formErrors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" onClick={handleAuth} type="submit">
              {isRegistration ? "Зарегистрироваться" : "Войти"}
            </Button>

            <Button
              variant="link"
              onClick={() => setIsRegistration(!isRegistration)}
            >
              {isRegistration
                ? "Уже есть аккаунт? Войдите..."
                : "Нету аккаунта? Зарегистрируйтесь..."}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorizationPage;
