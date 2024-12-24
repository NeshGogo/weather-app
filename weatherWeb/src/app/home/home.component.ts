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
import { DrawerComponent } from '../components/drawer/drawer.component';
import { FavoritePlacesComponent } from '../components/favorite-places/favorite-places.component';

@Component({
  selector: 'app-home',
  imports: [
    LayoutComponent,
    SearcherComponent,
    AirConditionSectionComponent,
    WeatherProgressViewComponent,
    SummarySectionComponent,
    SkeletonComponent,
    DrawerComponent,
    FavoritePlacesComponent,
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
  showDrawer = signal(false);
  recommendations = signal<string | null>(null);
  loadingRecomendations = signal(false);

  ngOnInit(): void {
    this.fetchFavoritePlaces();
    this.favoritePlaces().length > 0 &&
      this.selectPlace(this.favoritePlaces()[0]);
  }

  fetchPlace(text: string) {
    this.weatherService
      .getPlaces(text)
      .pipe(debounceTime(300))
      .subscribe((places) => {
        this.places.set(places);
      });
  }

  selectPlace(place: Place, hideDrawer = false) {
    if (hideDrawer) this.closeDrawer();
    this.place.set(place);
    this.fetchWeather();
    this.thereisAPlace.set(true);
    this.isAFavoritePlace.set(
      this.favoritePlaces().some((p) => p.id === place.id)
    );
    this.fetchRecommendations();
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

  fetchRecommendations() {
    this.loadingRecomendations.set(true);
    const units = this.unit() === 'C' ? 'metric' : 'us';
    this.weatherService
      .getRecomendations(<string>this.place()?.id, units)
      .subscribe((recomendation) => {
        this.recommendations.set(recomendation);
        console.log(recomendation);
        this.loadingRecomendations.set(false);
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

  removeFavoritePlace(place: Place | null = null) {
    const removePlace = place || this.place();
    this.weatherService.removeFavorite(<Place>removePlace).subscribe(() => {
      this.fetchFavoritePlaces();
      this.isAFavoritePlace.set(false);
    });
  }

  toggleFavoritePlace() {
    if (this.isAFavoritePlace()) {
      this.removeFavoritePlace();
    } else {
      this.addFavoritePlace();
    }
  }

  closeDrawer() {
    this.showDrawer.set(false);
  }

  openDrawer() {
    this.showDrawer.set(true);
  }
}
