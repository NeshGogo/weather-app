using NSubstitute;
using WeatherApi.Endpoints;
using WeatherApi.Infrastructure.WeatherService;
using WeatherApi.Models;

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
}
