import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/place';
import { of } from 'rxjs';
import { Weather } from '../models/weather';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let places: Place[] = [
    {
      name: 'Shantou',
      id: 'shantou',
    },
    {
      name: 'Santo Domingo',
      id: 'santo-domingo',
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new WeatherService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected places', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(places));
    service.getPlaces('text').subscribe((values) => {
      expect(values).withContext('expected places').toEqual(places);
      done();
    })
  });

  it('should return expected weather', (done: DoneFn) => {
    let weather: Weather = {
      temperature: 20,
      summary: 'sunny',
      precipitation: 0,
      wind: 10,
      icon: 8,
      hourly: [],
      daily: [],
    }
    httpClientSpy.get.and.returnValue(of(weather));
    service.getWeather('shantou', 'metric').subscribe((values) => {
      expect(values).withContext('expected weather').toEqual(weather);
      done();
    })
  });

  it('should return expected recomendations', (done: DoneFn) => {
    let recomendations = 'sunny';
    httpClientSpy.get.and.returnValue(of(recomendations));
    service.getRecomendations('shantou', 'metric').subscribe((values) => {
      expect(values).withContext('expected recomendations').toEqual(recomendations);
      done();
    })
  });

  it('should return expected favorite places', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(places));
    service.getFavoritePlaces().subscribe((values) => {
      expect(values).withContext('expected favorite places').toEqual(places);
      done();
    })
  });

  it('should add favorite place', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(''));
    service.addFavorite(places[0]).subscribe((values) => {
      expect(values).withContext('expected empty').toEqual('');
      done();
    });
  });

  it('should remove favorite place', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of(''));
    service.removeFavorite(places[0]).subscribe((values) => {
      expect(values).withContext('expected empty').toEqual('');
      done();
    });
  });
});
