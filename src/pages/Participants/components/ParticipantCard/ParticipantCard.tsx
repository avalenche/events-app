import React from "react";
import { Card } from "antd";
import { Participant } from "../../../../types";
import styles from "./ParticipantCard.module.scss";

interface PatrticipantCardProps {
  event: Participant;
}

export const ParticipantCard: React.FC<PatrticipantCardProps> = ({ event }) => {
  return (
    <Card className={styles.wrapper}>
      <p>Name: {event.fullName}</p>
      <p>Email: {event.email}</p>
    </Card>
  );
};
