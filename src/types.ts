export interface ListEvent {
  _id: number;
  title: string;
  description: string;
  organizer: string;
  date: Date;
}

export interface metaEvents {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount: number;
  pageSize: number;
  totalEvents: number;
}

export interface EventsResponse {
  data: ListEvent[];
  meta: metaEvents;
}

export interface EventParticipant {
  _doc: ListEvent;
  participants: Participant[];
}

export interface Participant {
  _id: number;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  referral: string;
}

export interface ApiClientOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export type NotificationType = "success" | "info" | "warning" | "error";
