import { useState, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spin, Select, Flex, Radio, RadioChangeEvent } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { getLocalListEvents } from "../../api/eventsApi";
import { EventCard } from "./components";
import styles from "./Events.module.scss";

const { Option } = Select;

export const Events = () => {
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["events", sortBy, sortOrder],
    queryFn: ({ pageParam = 1 }) =>
      getLocalListEvents(pageParam, sortBy, sortOrder),
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.meta.pageCount;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleSortOrder = (e: RadioChangeEvent) => {
    setSortOrder(e.target.value);
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <div className={styles.wrapper}>
      <Flex justify="space-between" align="center">
        <h1 className={styles.title}>Events</h1>
        <div>
          <Select
            value={sortBy}
            onChange={handleSortBy}
            className={styles.select}
          >
            <Option value="title">Title</Option>
            <Option value="date">Event Date</Option>
            <Option value="organizer">Organizer</Option>
          </Select>
          <Radio.Group value={sortOrder} onChange={handleSortOrder}>
            <Radio value="asc">Ascending</Radio>
            <Radio value="desc">Descending</Radio>
          </Radio.Group>
        </div>
      </Flex>
      <InfiniteScroll
        dataLength={data?.pages[0].meta.totalEvents || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spin>Loading more...</Spin>}
        endMessage={<p>No more events to load</p>}
        className={styles.card}
      >
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};
