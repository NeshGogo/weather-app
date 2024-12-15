import { SearcherItem } from "./searcherItem";

export interface Place extends SearcherItem {
  id: string;
  name: string;
  place_id: string;
  adm_area1: string;
  adm_area2?: string;
  country: string;
  lat: string;
  lon: string;
  timezone: string;
  type: string;
}
