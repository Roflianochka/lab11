import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import faqData from "../jsons/QuestionsData.json";
import { useSelector, useDispatch } from "react-redux";

const FaqPage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch({ type: "SET_QUESTIONS", payload: faqData });
  }, [dispatch]);

  return (
    <div>
      {questions.map((item) => (
        <Card key={item.id} className="mb-3">
          <Card.Header>
            <Card.Title>{item.question}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{item.answer}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FaqPage;
