import React from "react";
import { Card } from "antd";

import { Participant } from "../../../../types";
import styles from "./ParticipantCard.module.scss";

interface PatrticipantCardProps {
  participant: Participant;
}

export const ParticipantCard: React.FC<PatrticipantCardProps> = ({
  participant,
}) => {
  return (
    <Card className={styles.wrapper}>
      <p>Name: {participant.fullName}</p>
      <p>Email: {participant.email}</p>
    </Card>
  );
};
