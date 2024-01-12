import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="mt-5 bg-gray">
      <Container fluid>
        <Row>
          <Col md={4} className="text-center">
            <h5>Контакты</h5>
            <p>Телефон: 1111111111</p>
            <p>Email: maksimbelaev831@Email.com</p>
            <p>Адрес: ул. Якубосвкого, д 66</p>
          </Col>
          <Col md={4} className="text-center">
            <div>
              <h3>
                <a>«О нас»</a>
              </h3>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <h5>Мы в социальных сетях</h5>
            <p>
              <a href="https://www.facebook.com/example">Facebook</a>
            </p>
            <p>
              <a href="https://www.twitter.com/example">Twitter</a>
            </p>
            <p>
              <a href="https://www.instagram.com/example">Instagram</a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; AssetGuardian</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
