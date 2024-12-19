import { Pregression } from "./progression";
export interface Weather {
  precipitation: number;
  temperature: number;
  wind: number;
  icon: number;
  summary: string;
  hourly: Pregression[];
  daily: Pregression[];
}
