import { Pagination, Spin } from "antd";
import { getListEvents } from "../../data";
import { useState } from "react";
import { EventCard } from "./components";
import { useQuery } from "@tanstack/react-query";
import styles from "./Events.module.scss";

export const Events = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["events", pageSize, currentPage],
    queryFn: () => getListEvents(pageSize, currentPage),
  });

  console.log("load", isLoading);
  console.log("error", error);

  const handlePageSizeChange = (page: number, size: number) => {
    if (size !== pageSize) {
      setCurrentPage(1);
      setPageSize(size);
    } else {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <>
      <h1>Events</h1>
      <div className={styles.card}>
        {data?.products.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <Pagination
        className={styles.pagination}
        total={data?.total}
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageSizeChange}
        showSizeChanger
        pageSizeOptions={["5", "10", "20"]}
      />
    </>
  );
};
