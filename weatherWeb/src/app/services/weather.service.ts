import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly language = 'en';
  constructor(private http: HttpClient) {}

  getPlaces(text: string) {
    return this.http.get<Place[]>(
      `${environment.api}/find_places_prefix?text=${text}&language=${this.language}&key=${environment.apiKey}`
    );
  }
}
