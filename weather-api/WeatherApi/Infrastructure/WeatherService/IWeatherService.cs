using Refit;

namespace WeatherApi.Infrastructure.WeatherService;

public interface IWeatherService
{
    [Get("/find_places_prefix?language=en&text={text}&key={key}")]
    Task<IEnumerable<PlaceApiModel>> GetPlaces(string text, string key);
}
