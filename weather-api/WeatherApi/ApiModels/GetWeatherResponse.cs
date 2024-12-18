namespace WeatherApi.ApiModels;

public record GetWeatherResponse(
    decimal Precipitation, 
    decimal Temperature, 
    int Icon, 
    string Summary, 
    IEnumerable<Progression> Hourly,
    IEnumerable<Progression> Daily);

public record Progression(string Title, int Icon, string Value);
