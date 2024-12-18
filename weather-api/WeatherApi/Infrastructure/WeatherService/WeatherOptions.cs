namespace WeatherApi.Infrastructure.WeatherService;

public class WeatherOptions
{
    public const string SectionName = "Weather";
    public string Key { get; set; } = string.Empty;
    public string Url { get; set; }
}
