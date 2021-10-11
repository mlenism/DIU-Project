export interface ReserveInfoOne {
  uuid: string;
  adults: number;
  children: number;
  cost: number;
  timestamp: string;
  departure: string;
  entrance: string;
  name: string;
  plan: string | null;
  room: string;
}
