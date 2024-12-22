using Refit;

namespace WeatherApi.Infrastructure.GeminiServices;

public static class GeminiServiceExtensions
{
    public static void AddGeminiService(this IServiceCollection services, IConfiguration configuration)
    {
        GeminiOptions options = new();
        configuration.GetRequiredSection(GeminiOptions.SectionName).Bind(options);

        services.AddSingleton(options);

        services.AddRefitClient<IGeminiService>().ConfigureHttpClient(c => c.BaseAddress = new Uri(options.BaseUrl));
    }
}
