using Refit;

namespace WeatherApi.Infrastructure.WeatherService;

public interface IWeatherService
{
    [Get("/find_places_prefix?language=en&text={text}&key={key}")]
    Task<IEnumerable<PlaceApiModel>> GetPlaces(string text, string key);

    [Get("/point?language=en&place_id={placeId}&units={units}&sections=all&key={key}")]
    Task<WeatherApiModel> GetWeather(string placeId, string units, string key);
}
