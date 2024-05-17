import { EventParticipant, EventsResponse } from "./types";

export const getLocalListEvents = (
  pageSize: number,
  currentPage: number
): Promise<EventsResponse> =>
  fetch(
    `http://localhost:5000/api/events?pageSize=${pageSize}&currentPage=${currentPage}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    return res.json();
  });

export const getLocalEvent = (id: string): Promise<EventParticipant> =>
  fetch(`http://localhost:5000/api/events/${id}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    return res.json();
  });
