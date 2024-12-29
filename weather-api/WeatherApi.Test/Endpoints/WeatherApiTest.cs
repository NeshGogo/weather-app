using NSubstitute;
using WeatherApi.Endpoints;
using WeatherApi.Infrastructure.WeatherService;

namespace WeatherApi.Test.Endpoints;

public class WeatherApiTest
{
    private readonly IWeatherService _weatherService;
    private readonly WeatherOptions _weatherOptions;

    public WeatherApiTest()
    {
        _weatherService = Substitute.For<IWeatherService>();
        _weatherOptions = new WeatherOptions();
        _weatherOptions.Key = Guid.NewGuid().ToString();
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
}
