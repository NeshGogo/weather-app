﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using WeatherApi.ApiModels;
using WeatherApi.Endpoints;
using WeatherApi.Infrastructure.Redis;
using WeatherApi.Infrastructure.WeatherService;
using WeatherApi.Models;

namespace WeatherApi.Test.Endpoints;

public class WeatherApiTest
{
    private readonly IWeatherService _weatherService;
    private readonly WeatherOptions _weatherOptions;
    private readonly IRedisStore _redisStore;

    public WeatherApiTest()
    {
        _weatherService = Substitute.For<IWeatherService>();
        _weatherOptions = new WeatherOptions();
        _weatherOptions.Key = Guid.NewGuid().ToString();
        _redisStore = Substitute.For<IRedisStore>();
    }

    [Fact]
    public async Task ShouldGetPlaces_WhenTextMatchWithName()
    {
        IEnumerable<PlaceApiModel> places = [
            new PlaceApiModel("santo=domingo-este", "Santo Domingo Este"),
            new PlaceApiModel("santo=domingo-norto", "Santo Domingo Norte"),
            new PlaceApiModel("santo-domingo", "Santo Domingo"),
        ];

        _weatherService.GetPlaces("Santo", _weatherOptions.Key).Returns(places);

        var results = await WeatherApiEndpoints.GetPlaces("Santo", _weatherService, _weatherOptions);

        Assert.NotEmpty(results);
        Assert.Equal(3, results.Count());
    }

    [Fact]
    public async Task ShouldGetEmpyPlaces_WhenTextNotMatch()
    {
        IEnumerable<PlaceApiModel> places = [
           new PlaceApiModel("santo=domingo-este", "Santo Domingo Este"),
            new PlaceApiModel("santo=domingo-norto", "Santo Domingo Norte"),
            new PlaceApiModel("santo-domingo", "Santo Domingo"),
        ];

        _weatherService.GetPlaces("Santo", _weatherOptions.Key).Returns(places);

        var results = await WeatherApiEndpoints.GetPlaces("London", _weatherService, _weatherOptions);

        Assert.Empty(results);
    }

    [Fact]
    public async Task ShouldGetWeather_WhenPlaceIdMatch()
    {
        var weather = new WeatherApiModel(
            new CurrentWeather(new Precipitation(0), 30, 1, "Clear sky", new Wind(10)),
            new Hourly([
                new DataHourlyPregression( DateTime.Now, 1, 30),
                    new DataHourlyPregression(DateTime.Now.AddHours(1), 1, 30),
                    new DataHourlyPregression(DateTime.Now.AddHours(2), 1, 30),
                ]),
            new Daily([
                new DataDailyPregression(new DateTime().AddDays(1), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(2), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(3), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(4), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(5), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(6), 1, new AllDayTemperaturePregression(30, 20))
                ]));

        _weatherService.GetWeather("santo-domingo-este", "metric", _weatherOptions.Key).Returns(weather);

        var result = await WeatherApiEndpoints.GetWeather("santo-domingo-este", "metric", _weatherService, _weatherOptions);

        Assert.NotNull(result);
        Assert.Equal(0, result.Precipitation);
        Assert.Equal(30, result.Temperature);
        Assert.Equal(10, result.Wind);
        Assert.Equal(1, result.Icon);
        Assert.Equal("Clear sky", result.Summary);
        Assert.Equal(3, result.Hourly.Count());
        Assert.Equal(6, result.Daily.Count());
    }

    [Fact]
    public async Task ShouldNotGetWeather_WhenPlaceIdNotMatch()
    {
        var weather = new WeatherApiModel(
            new CurrentWeather(new Precipitation(0), 30, 1, "Clear sky", new Wind(10)),
            new Hourly([
                new DataHourlyPregression( DateTime.Now, 1, 30),
                    new DataHourlyPregression(DateTime.Now.AddHours(1), 1, 30),
                    new DataHourlyPregression(DateTime.Now.AddHours(2), 1, 30),
                ]),
            new Daily([
                new DataDailyPregression(new DateTime().AddDays(1), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(2), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(3), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(4), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(5), 1, new AllDayTemperaturePregression(30, 20)),
                new DataDailyPregression(new DateTime().AddDays(6), 1, new AllDayTemperaturePregression(30, 20))
                ]));

        _weatherService.GetWeather("santo-domingo-este", "metric", _weatherOptions.Key).Returns(weather);

        var result = await WeatherApiEndpoints.GetWeather("santo-domingo", "metric", _weatherService, _weatherOptions);

        Assert.Null(result);
    }

    [Fact]
    public async Task ShouldGetMyPlaces_WhenThereArePlacesStored()
    {
        IEnumerable<Place> places = [
            new Place { Id= "santo-domingo-este", Name="Santo Domingo Este"},
            new Place{Id="santo-domingo-norte", Name= "Santo Domingo Norte" },
            new Place{Id="santo-domingo", Name = "Santo Domingo"},
        ];

        _redisStore.GetPlaces().Returns(places);

        var response = await WeatherApiEndpoints.GetMyPlaces(_redisStore);

        Assert.NotNull(response);
        var result = response as IValueHttpResult;
        var placesResult = result.Value as IEnumerable<Place>;
        Assert.Equal(3, placesResult.Count());
    }

    [Fact]
    public async Task ShouldReturnEmptyPlaces_WhenThereAreNotPlacesStored()
    {
        _redisStore.GetPlaces().Returns([]);

        var response = await WeatherApiEndpoints.GetMyPlaces(_redisStore);

        Assert.NotNull(response);
        var result = response as IValueHttpResult;
        var placesResult = result.Value as IEnumerable<Place>;
        Assert.Empty(placesResult);
    }

    [Fact]
    public async Task ShouldCreatePlace_WhenPlaceIsNotStored()
    {
        var place = new CreatePlaceRequest("santo-domingo-este", "Santo Domingo Este");

        var response = await WeatherApiEndpoints.AddMyPlace(place, _redisStore);

        Assert.NotNull(response);
        Assert.IsType<Created<Place>>(response);
        var result = response as Created<Place>;
       
        Assert.Equal(place.Name, result.Value.Name);
        Assert.Equal(place.Id, result.Value.Id);
    }

    [Fact]
    public async Task ShouldDeletePlace_WhenPlaceIsStored()
    {
        var place = new Place { Id = "santo-domingo-este", Name = "Santo Domingo Este" };

        _redisStore.GetPlace(place.Id).Returns(place);

        var response = await WeatherApiEndpoints.DeleteMyPlace(place.Id, _redisStore);

        Assert.NotNull(response);
        Assert.IsType<NoContent>(response);
    }
}