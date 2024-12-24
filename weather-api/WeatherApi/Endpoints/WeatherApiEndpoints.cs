using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WeatherApi.ApiModels;
using WeatherApi.Infrastructure.GeminiServices;
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

        endpoint.MapGet("/WeatherSumarry/{id}", async (string id, [FromQuery] string units,
            IWeatherService weatherService, IGeminiService geminiService, WeatherOptions weatherOptions,
            GeminiOptions geminiOptions) =>
        {
            var weather = await weatherService.GetWeather(id, units, weatherOptions.Key);
            string weatherJson = JsonSerializer.Serialize(weather);

            var prompt = "Considering the following weather conditions, suggest an activity for today. " +
            "Please keep the response to a moderate length, providing enough detail " +
            $"to be helpful but not overly verbose and don't use markdown. Here is the weather details: {weatherJson}";

            var body = new GeminiRequestBody([
                    new GeminiContent([
                        new GeminiPart(prompt)
                        ])
                ]);

            var geminiResponse = await geminiService.TextGeneration(body, geminiOptions.Model, geminiOptions.Key);

            var summary = geminiResponse.Candidates.First().Content.Parts.First().Text;
            return TypedResults.Ok(summary);
        });
    }
}
