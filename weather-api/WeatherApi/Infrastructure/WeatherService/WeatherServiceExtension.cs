using Refit;

namespace WeatherApi.Infrastructure.WeatherService;

public static class WeatherServiceExtension
{
    public static void AddWeatherService(this IServiceCollection services, IConfiguration configuration)
    {
        WeatherOptions options = new();
        configuration.GetRequiredSection(WeatherOptions.SectionName).Bind(options);

        services.AddSingleton(options);

        services.AddRefitClient<IWeatherService>().ConfigureHttpClient( c => c.BaseAddress = new Uri(options.Url));
    }
}
