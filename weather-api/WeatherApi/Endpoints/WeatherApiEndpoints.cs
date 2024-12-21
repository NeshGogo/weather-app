using Microsoft.AspNetCore.Mvc;
using WeatherApi.ApiModels;
using WeatherApi.Infrastructure.Redis;
using WeatherApi.Infrastructure.WeatherService;
using WeatherApi.Models;

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

            var hourly = weather.hourly.Data.Select(p => new Progression($"{p.Date.Hour}:00", p.Icon, $"{Math.Round(p.Temperature)}°"));
            var daily = weather.daily.Data.Select(p => 
                new Progression(p.Day.DayOfWeek.ToString(), p.Icon, $"{Math.Round(p.All_day.Temperature_max)}/{Math.Round(p.All_day.Temperature_min)}"));

            return new GetWeatherResponse(
                weather.Current.Precipitation.Total,
                weather.Current.Temperature,
                weather.Current.Wind.Speed,
                weather.Current.Icon_num,
                weather.Current.Summary,
                hourly,
                daily);
        });

        endpoint.MapPost("/MyPlaces", async ([FromBody] CreatePlaceRequest request, IRedisStore store) =>
        {
            var place = new Place()
            {
                Id = request.Id,
                Name = request.Name,
            };

            await store.CreatePlace(place);
            return Results.Created($"/MyPlaces/{place.Id}", place);
        });

        endpoint.MapGet("/MyPlaces/{id}", async (string id, IRedisStore store) =>
        {
            var place = await store.GetPlace(id);
            return Results.Ok(place);
        });

        endpoint.MapGet("/MyPlaces", async (IRedisStore store) =>
        {
            var places = await store.GetPlaces();
            return Results.Ok(places);
        });

        endpoint.MapDelete("/MyPlaces/{id}", async (string id, IRedisStore store) =>
        {
            await store.RemovePlace(id);
            return TypedResults.NoContent();
        });
    }
}
