import React from "react";
import { Card, Space } from "antd";
import { ListEvent } from "../../../../types";
import styles from "./EventCard.module.scss";
import { NavLink } from "react-router-dom";

interface EventCardProps {
  event: ListEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const date2 = new Date();
  console.log(date2.getDay());
  return (
    <Card title={event.title} className={styles.wrapper}>
      <div>
        <p>Organize: {event.organizer}</p>
        <p>{event.description}</p>
        <p>Date: {event.date}</p>
        <Space className={styles.links}>
          <NavLink to={`/events/${event._id}/register`}>Register</NavLink>
          <NavLink to={`/events/${event._id}`}>View</NavLink>
        </Space>
      </div>
    </Card>
  );
};
