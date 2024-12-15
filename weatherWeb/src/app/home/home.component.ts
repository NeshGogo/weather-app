import { Component, inject, signal } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SearcherComponent } from '../components/searcher/searcher.component';
import { WeatherService } from '../services/weather.service';
import { Place } from '../models/place';
import { debounceTime } from 'rxjs';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-home',
  imports: [LayoutComponent, SearcherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly weatherService = inject(WeatherService);
  places = signal<Place[]>([]);
  place = signal<Place | null>(null);
  weather = signal<Weather | null>(null);

  fetchPlace(text: string) {
    this.weatherService
      .getPlaces(text)
      .pipe(debounceTime(300))
      .subscribe((places) => {
        this.places.set(places);
      });
  }

  selectPlace(place: Place) {
    this.place.set(place);
    this.fetchWeather();
  }

  fetchWeather() {
    this.weatherService
      .getWeather(<string>this.place()?.place_id, 'metric')
      .subscribe((weather) => {
        this.weather.set(weather)
        console.log(weather);
      });
  }
}
