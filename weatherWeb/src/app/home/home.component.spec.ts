import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(WeatherService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch favorite places', () => {
    const places = [
      { id: 'london', name: 'London' },
      { id: 'paris', name: 'Paris' },
    ];
    spyOn(service, 'getFavoritePlaces').and.returnValue(of(places));
    component.fetchFavoritePlaces();
    expect(component.favoritePlaces()).toEqual(places);
  });

  it('should select a place', () => {
    const place = { id: 'london', name: 'London' };
    spyOn(service, 'getWeather').and.returnValue(of({} as any));
    component.selectPlace(place);
    expect(component.place()).toEqual(place);
  });

  it('should get voices', () => {
    const voices = speechSynthesis.getVoices();
    spyOn(speechSynthesis, 'getVoices').and.returnValue(voices);
    component.getVoices();
    expect(component.voices()).toEqual(voices);
  });

  it('should fetch a place', () => {
    const places = [
      { id: 'london', name: 'London' },
      { id: 'paris', name: 'Paris' },
    ];
    const getPlacesSpy = spyOn(service, 'getPlaces').and.returnValue(of(places));
    component.fetchPlace('london');
    expect(component.places()).toEqual(places);
    expect(getPlacesSpy).toHaveBeenCalledWith('london');
  });

  it('should fetch weather', () => {
    const weather = {} as any;
    const getWeatherSpy = spyOn(service, 'getWeather').and.returnValue(of(weather));
    component.selectPlace({ id: 'london', name: 'London' });
    expect(component.weather()).toEqual(weather);
    expect(getWeatherSpy).toHaveBeenCalledWith('london', 'metric');
  });

  it('should fetch recommendations', () => {
    const recommendations = 'Recommendation';
    const getRecommendationsSpy = spyOn(service, 'getRecomendations').and.returnValue(of(recommendations));
    component.selectPlace({ id: 'london', name: 'London' });
    expect(component.recommendations()).toEqual(recommendations);
    expect(getRecommendationsSpy).toHaveBeenCalledOnceWith('london', 'metric');
  });

  it('should handle unit change', () => {
    const weather = {} as any;
    const getWeatherSpy = spyOn(service, 'getWeather').and.returnValue(of(weather));
    component.selectPlace({ id: 'london', name: 'London' });
    component.handleUnitChange('us');
    expect(getWeatherSpy).toHaveBeenCalledWith('london', 'us');
  });

  it('should add favorite place', () => {
    const place = { id: 'london', name: 'London' };
    const addFavoriteSpy = spyOn(service, 'addFavorite').and.returnValue(of({}));
    component.place.set(place);
    component.addFavoritePlace();
    expect(addFavoriteSpy).toHaveBeenCalledWith(place);
  });

  it('should remove favorite place', () => {
    const place = { id: 'london', name: 'London' };
    const removeFavoriteSpy = spyOn(service, 'removeFavorite').and.returnValue(of({}));
    component.removeFavoritePlace(place);
    expect(removeFavoriteSpy).toHaveBeenCalledWith(place);
  });
});
