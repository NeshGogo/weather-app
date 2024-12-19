import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Place } from '../models/place';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(placeId: string, units: string) {
    return this.http.get<Weather>(
      `${environment.api}/weather/${placeId}?units=${units}`
    );
  }

  getPlaces(text: string) {
    return this.http.get<Place[]>(
      `${environment.api}/places?searchTerm=${text}`
    );
  }
}
