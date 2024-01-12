import React, { useState, useEffect } from "react";
import inspectionsData from "../jsons/InspectionsData.json";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CheckSchedule.css";

const CheckShedule = () => {
  const inspections = useSelector((state) => state.inspections);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_INSPECTIONS", payload: inspectionsData });
  }, [dispatch]);

  const renderTable = () => {
    const daysOfWeek = [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ];
    const weeks = [1, 2, 3, 4];

    return (
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Неделя</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week}>
              <td>{week}</td>
              {daysOfWeek.map((day) => (
                <td key={day} className="schedule-cell">
                  {getInspectionForDay(week, day)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const getInspectionForDay = (week, day) => {
    const inspection = inspections.find(
      (insp) => insp.week === week && insp.day === day
    );

    if (inspection) {
      return (
        <div>
          <p className="company-name">Предприятие: {inspection.company}</p>
          <p className="commission">Коммисия: {inspection.commission}</p>
          <p className="details">Детали: {inspection.details}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h2 className="schedule-heading">Schedule of Inspections</h2>
      {renderTable()}
    </div>
  );
};

export default CheckShedule;
