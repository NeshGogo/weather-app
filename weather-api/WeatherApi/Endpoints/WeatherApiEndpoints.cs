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
    }
}
