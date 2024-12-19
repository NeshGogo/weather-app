import { Component, inject, signal } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { SearcherComponent } from '../components/searcher/searcher.component';
import { WeatherService } from '../services/weather.service';
import { Place } from '../models/place';
import { debounceTime } from 'rxjs';
import { Weather } from '../models/weather';
import { AirConditionSectionComponent } from '../components/air-condition-section/air-condition-section.component';
import { WeatherProgressViewComponent } from '../components/weather-progress-view/weather-progress-view.component';
import { SummarySectionComponent } from '../components/summary-section/summary-section.component';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

@Component({
  selector: 'app-home',
  imports: [
    LayoutComponent,
    SearcherComponent,
    AirConditionSectionComponent,
    WeatherProgressViewComponent,
    SummarySectionComponent,
    SkeletonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly weatherService = inject(WeatherService);
  loading = signal(false);
  places = signal<Place[]>([]);
  place = signal<Place | null>(null);
  weather = signal<Weather | null>(null);
  unit = signal('C');

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
    this.loading.set(true);
    const units = this.unit() === 'C' ? 'metric' : 'us';
    this.weatherService
      .getWeather(<string>this.place()?.id, units)
      .subscribe((weather) => {
        this.weather.set(weather);
        this.loading.set(false);
      });
  }

  handleUnitChange(unit: string) {
    this.unit.set(unit);
    if (this.place()) {
      this.fetchWeather();
    }
  }
}
