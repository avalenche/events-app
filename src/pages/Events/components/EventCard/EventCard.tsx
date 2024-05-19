import React from "react";
import { Card, Space } from "antd";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

import { ListEvent } from "../../../../types";
import styles from "./EventCard.module.scss";

interface EventCardProps {
  event: ListEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card title={event.title} className={styles.wrapper}>
      <div>
        <p>{event.organizer}</p>
        <p>{event.description}</p>
        <p>{format(event.date, "yyyy-MM-dd")}</p>

        <Space className={styles.links}>
          <NavLink to={`/events/${event._id}/register`}>Register</NavLink>
          <NavLink to={`/events/${event._id}`}>View</NavLink>
        </Space>
      </div>
    </Card>
  );
};
