import { Component, inject, OnInit, signal } from '@angular/core';
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
export class HomeComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);
  loading = signal(false);
  places = signal<Place[]>([]);
  place = signal<Place | null>(null);
  weather = signal<Weather | null>(null);
  unit = signal('C');
  isAFavoritePlace = signal(false);
  thereisAPlace = signal(false);
  favoritePlaces = signal<Place[]>([]);

  ngOnInit(): void {
    this.fetchFavoritePlaces();
  }

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
    this.thereisAPlace.set(true);
    this.isAFavoritePlace.set(
      this.favoritePlaces().some((p) => p.id === place.id)
    );
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

  fetchFavoritePlaces() {
    this.weatherService.getFavoritePlaces().subscribe((places) => {
      this.favoritePlaces.set(places);
    });
  }

  addFavoritePlace() {
    this.weatherService.addFavorite(<Place>this.place()).subscribe(() => {
      this.fetchFavoritePlaces();
      this.isAFavoritePlace.set(true);
    });
  }

  toggleFavoritePlace() {
    if (this.isAFavoritePlace()) {
      // TODO: Implement removeFavoritePlace
    } else {
      this.addFavoritePlace();
    }
  }
}
