import { EventsResponse, Participant } from "./types";

export const getListEvents = (
  pageSize: number,
  currentPage: number
): Promise<EventsResponse> =>
  fetch(
    `https://dummyjson.com/products?limit=${pageSize}&skip=${
      currentPage == 1 ? 0 : pageSize * currentPage
    }`
  ).then((res) => res.json());

export const putParticipant = (
  pageSize: number,
  currentPage: number
): Promise<Participant> =>
  fetch(
    `https://dummyjson.com/products?limit=${pageSize}&skip=${
      currentPage == 1 ? 0 : pageSize * currentPage
    }`
  ).then((res) => res.json());
