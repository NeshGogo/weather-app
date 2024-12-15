import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Place } from '../models/place';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly language = 'en';
  private readonly sections = 'all';
  constructor(private http: HttpClient) {}

  getWeather(placeId: string, units: string) {
    return this.http.get<Weather>(
      `${environment.api}/point?place_id=${placeId}&units=${units}&sections=${this.sections}&language=${this.language}&key=${environment.apiKey}`
    );
  }

  getPlaces(text: string) {
    return this.http.get<Place[]>(
      `${environment.api}/find_places_prefix?text=${text}&language=${this.language}&key=${environment.apiKey}`
    );
  }
}
