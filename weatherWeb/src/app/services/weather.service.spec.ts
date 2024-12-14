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
      place_id: 'shantou',
      adm_area1: 'Guangdong',
      country: 'China',
      lat: '23.36814N',
      lon: '116.71479E',
      timezone: 'Asia/Shanghai',
      type: 'settlement',
    },
    {
      name: 'Santo Domingo',
      place_id: 'santo-domingo',
      adm_area1: 'Nacional',
      adm_area2: 'Santo Domingo De Guzmán',
      country: 'Dominican Republic',
      lat: '18.47186N',
      lon: '69.89232W',
      timezone: 'America/Santo_Domingo',
      type: 'settlement',
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
