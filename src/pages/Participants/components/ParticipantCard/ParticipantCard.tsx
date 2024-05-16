import React from "react";
import { Card } from "antd";
import { ListEvent } from "../../../../types";
import styles from "./ParticipantCard.module.scss";

interface EventCardProps {
  event: ListEvent;
}

export const ParticipantCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className={styles.wrapper}>
      <p>Name: {event.organizer}</p>
      <p>Email: {event.date}</p>
    </Card>
  );
};
