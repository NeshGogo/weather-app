import { Component, inject, signal } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SearcherComponent } from '../components/searcher/searcher.component';
import { WeatherService } from '../services/weather.service';
import { Place } from '../models/place';
import { debounceTime } from 'rxjs';
import { Weather } from '../models/weather';
import { DatePipe } from '@angular/common';
import { AirConditionSectionComponent } from '../components/air-condition-section/air-condition-section.component';
import { WeatherProgressViewComponent } from '../components/weather-progress-view/weather-progress-view.component';
import { Pregression } from '../models/progression';

@Component({
  selector: 'app-home',
  imports: [
    LayoutComponent,
    SearcherComponent,
    DatePipe,
    AirConditionSectionComponent,
    WeatherProgressViewComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly weatherService = inject(WeatherService);
  places = signal<Place[]>([]);
  place = signal<Place | null>(null);
  weather = signal<Weather | null>(null);
  hourlyProgression = signal<Pregression[]>([]);
  dailyProgression = signal<Pregression[]>([]);

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
        this.weather.set(weather);
        this.hourlyProgression.set(
          [... weather.hourly?.data?.map((w) => {
            return {
              title: `${new Date(w.date).getHours().toString()}:00`,
              icon: w.icon,
              iconDescription: weather.current.summary,
              value: `${w.temperature.toFixed()}°`,
            };
          })]
        );
        this.dailyProgression.set(
          [... weather.daily?.data?.map((w) => {
            const day = new Intl.DateTimeFormat('en-US', {weekday: 'long'})
                        .format(new Date(w.day));
            return {
              title: day,
              icon: w.icon,
              iconDescription: weather.current.summary,
              value: `${w.all_day.temperature_max.toFixed()}/${w.all_day.temperature_min.toFixed()}`,
            };
          })]
        );
      });
  }
}
