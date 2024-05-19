import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { Spin, Input, Flex } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

import { ParticipantCard } from "./components/ParticipantCard";
import { getLocalEvent, searchParticipants } from "../../api/eventsApi";
import styles from "./Participants.module.scss";

const { Search } = Input;

export const Participants = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: eventData, isLoading: eventLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getLocalEvent(id!),
  });

  const {
    data: participantsData,
    refetch,
    isLoading: participantsLoading,
  } = useQuery({
    queryKey: ["participants", id, searchQuery],
    queryFn: () => searchParticipants(id!, searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    refetch();
  };

  if (eventLoading || participantsLoading) return <Spin fullscreen />;

  return (
    <div className={styles.wrapper}>
      <Flex align="baseline">
        <NavLink to="/events">
          <RollbackOutlined className={styles.a} />
        </NavLink>
        <h1 className={styles.h1}>
          {`${eventData?._doc.title} Participants`}{" "}
        </h1>
      </Flex>
      <Search
        placeholder="Search participants"
        onSearch={handleSearch}
        enterButton
      />
      <div className={styles.card}>
        {searchQuery && participantsData
          ? participantsData.map((participant) => (
              <ParticipantCard
                key={participant._id}
                participant={participant}
              />
            ))
          : eventData?.participants.map((participant) => (
              <ParticipantCard
                key={participant._id}
                participant={participant}
              />
            ))}
      </div>
    </div>
  );
};
