namespace WeatherApi.Infrastructure.GeminiServices;

public class GeminiOptions
{
    public const string SectionName = "Gemini";
    public string BaseUrl { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
}
