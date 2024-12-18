using Microsoft.AspNetCore.Mvc;
using WeatherApi.ApiModels;
using WeatherApi.Infrastructure.WeatherService;

namespace WeatherApi.Endpoints;

public static class WeatherApiEndpoints
{
    public static void RegisterEndpoints(this IEndpointRouteBuilder endpoint)
    {
        endpoint.MapGet("/Places", async ([FromQuery] string searchTerm, IWeatherService service, WeatherOptions options) =>
        {
            var places = await service.GetPlaces(searchTerm, options.Key);

            return places.Select(p => new GetPlaceResponse(p.Place_id, p.Name));
        });

        endpoint.MapGet("/weather/{placeId}", async (string placeId, [FromQuery] string units, IWeatherService service, WeatherOptions options) =>
        {
            var weather = await service.GetWeather(placeId, units, options.Key);

            var hourly = weather.hourly.Data.Select(p => new Progression($"{p.Date.Hour}:00", p.Icon, $"{p.Temperature}°"));
            var daily = weather.daily.Data.Select(p => new Progression(p.Day.DayOfWeek.ToString(), p.Icon, $"{p.All_day.Temperature_max}/{p.All_day.Temperature_min}"));

            return new GetWeatherResponse(
                weather.Current.Precipitation.Total,
                weather.Current.Temperature,
                weather.Current.Icon_num,
                weather.Current.Summary,
                hourly,
                daily);
        });
    }
}
