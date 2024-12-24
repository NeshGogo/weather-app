import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';

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
  private readonly platformId = inject(PLATFORM_ID);
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
  voices = signal<SpeechSynthesisVoice[]>([]);
  isPlaying = signal(false);

  ngOnInit(): void {
    this.fetchFavoritePlaces();
    this.favoritePlaces().length > 0 &&
      this.selectPlace(this.favoritePlaces()[0]);
    if (isPlatformBrowser(this.platformId)) {
      this.getVoices();
    }
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

  speak() {
    const synth = window.speechSynthesis;
    const enVoices = this.voices().filter((voice) => voice.lang === 'en-US');
    const voice = enVoices[0];
    const text = `The weather in ${this.place()?.name} is ${
      this.weather()?.summary
    } and the temperature is ${
      this.weather()?.temperature
    } degrees. The recomendations for today: ${this.recommendations()}`;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voice;
    utterThis.onend = () => {
      this.isPlaying.set(false);
    };
    synth.speak(utterThis);
    this.isPlaying.set(true);
  }

  getVoices() {
    let voices = speechSynthesis.getVoices();
    if (voices.length !== 0) {
      this.voices.set(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        this.voices.set(voices);
      };
    }
  }

  stopListening() {
    speechSynthesis.cancel();
    this.isPlaying.set(false);
  }
}
