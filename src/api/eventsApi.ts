import { EventParticipant, EventsResponse, Participant } from "../types";
import apiClient from "./apiClient";

export const getLocalListEvents = (
  pageSize: number,
  currentPage: number
): Promise<EventsResponse> =>
  apiClient<EventsResponse>(
    `/events?pageSize=${pageSize}&currentPage=${currentPage}`
  );

export const getLocalEvent = (id: string): Promise<EventParticipant> =>
  apiClient<EventParticipant>(`/events/${id}`);

export const registerParticipant = (
  values: Participant,
  eventId: string
): Promise<EventParticipant> =>
  apiClient<EventParticipant>(`/events/register/${eventId}`, {
    method: "POST",
    body: JSON.stringify(values),
  });
