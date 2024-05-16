export interface ListEvent {
  id: number;
  title: string;
  description: string;
  organizer: string;
  date: Date;
  participants: Participant[];
}

export interface EventsResponse {
  limit: number;
  products: ListEvent[];
  skip: number;
  total: number;
}

export interface Participant {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  whereHear: string;
}
