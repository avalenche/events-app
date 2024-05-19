import { EventParticipant, EventsResponse, Participant } from "../types";
import apiClient from "./apiClient";

export const getLocalListEvents = (
  currentPage: number,
  sortBy: string,
  sortOrder: string
): Promise<EventsResponse> =>
  apiClient<EventsResponse>("/events", {
    method: "GET",
    params: { pageSize: 10, currentPage, sortBy, sortOrder },
  });

export const getLocalEvent = (id: string): Promise<EventParticipant> =>
  apiClient<EventParticipant>(`/events/${id}`);

export const registerParticipant = (
  values: Participant,
  eventId: string
): Promise<EventParticipant> =>
  apiClient<EventParticipant>(`/participants/register/${eventId}`, {
    method: "POST",
    body: JSON.stringify(values),
  });

export const searchParticipants = (
  eventId: string,
  query: string
): Promise<Participant[]> =>
  apiClient<Participant[]>("/participants/search", {
    method: "GET",
    params: { eventId, query },
  });
