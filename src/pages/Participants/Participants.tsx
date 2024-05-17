import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import { ParticipantCard } from "./components/ParticipantCard";
import { getLocalEvent } from "../../data";
import styles from "./Participants.module.scss";

export const Participants = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => getLocalEvent(id),
  });
  console.log("loading", isLoading);
  console.log("data", data);

  if (isLoading) return <Spin fullscreen />;

  return (
    <div className={styles.wrapper}>
      <h1>{`${data?._doc.title} Participants`}</h1>
      {
        <div className={styles.card}>
          {data?.participants.map((event) => (
            <ParticipantCard key={event._id} event={event} />
          ))}
        </div>
      }
    </div>
  );
};
