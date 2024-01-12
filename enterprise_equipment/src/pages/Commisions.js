import React, { useState, useEffect } from "react";
import data from "../jsons/CommisionsData.json";
import "../styles/Commisions.css";
import CommisionsItem from "./CommisionsItem";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Commisions = () => {
  const token = localStorage.getItem("token");
  const commissions = useSelector((state) => state.commissions);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/commissions");
      const jsonData = await response.json();
      dispatch({ type: "SET_COMMISSIONS", payload: jsonData });
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(commissions);
  }, []);

  const handleMemberDelete = (commissionId, memberId) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = commission.members.filter(
          (member) => member.id !== memberId
        );

        if (updatedMembers.length === 0) {
          return null;
        }

        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    const filteredCommissions = updatedCommissions.filter(
      (commission) => commission !== null
    );

    dispatch({ type: "SET_COMMISSIONS", payload: filteredCommissions });
  };

  const handleCommissionAdd = async () => {
    try {
      const response = await fetch("http://localhost:5000/commissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          newCommission: {
            name: "New Commission",
            Authorization: `${token}`,
          },
        }),
      });

      if (response.ok) {
        const newCommission = await response.json();
        newCommission.members = [];
        dispatch({ type: "ADD_COMMISSION", payload: newCommission });
      } else {
        console.error("Failed to add commission");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleMemberAdd = (commissionId, newMember) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = [...commission.members, newMember];
        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    dispatch({ type: "SET_COMMISSIONS", payload: updatedCommissions });
  };

  const handleMemberEdit = (commissionId, memberId, updatedMember) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = commission.members.map((member) =>
          member.id === memberId ? { ...member, ...updatedMember } : member
        );

        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    dispatch({ type: "SET_COMMISSIONS", payload: updatedCommissions });
  };

  return (
    <>
      <div className="commissions-container">
        {commissions.map((commission) => (
          <CommisionsItem
            key={commission.id}
            commission={commission}
            onMemberDelete={handleMemberDelete}
            onMemberAdd={handleMemberAdd}
            onMemberEdit={handleMemberEdit}
            fetchDataMethod={fetchData}
          />
        ))}
        <Button
          variant="success"
          className="mb-3"
          onClick={handleCommissionAdd}
        >
          Добавить комиссию
        </Button>
      </div>
    </>
  );
};

export default Commisions;
