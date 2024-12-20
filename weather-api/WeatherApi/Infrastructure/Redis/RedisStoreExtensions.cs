namespace WeatherApi.Infrastructure.Redis;

public static class RedisStoreExtensions
{
    public static void AddRedisStore(this IServiceCollection services, IConfiguration configuration)
    {
        RedisOptions options = new();
        configuration.GetRequiredSection(RedisOptions.SectionName).Bind(options);

        services.AddStackExchangeRedisCache(opt => opt.Configuration = options.Configuration);
        services.AddSingleton<IRedisStore, RedisStore>();
    }
}
