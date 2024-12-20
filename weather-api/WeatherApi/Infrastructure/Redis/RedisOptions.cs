namespace WeatherApi.Infrastructure.Redis;

public class RedisOptions
{
    public const string SectionName = "Redis";

    public string Configuration { get; set; } = string.Empty;
}
