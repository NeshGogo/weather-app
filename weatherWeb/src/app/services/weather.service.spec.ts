import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/place';
import { of } from 'rxjs';

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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
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
});
