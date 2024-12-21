using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using WeatherApi.Models;

namespace WeatherApi.Infrastructure.Redis;

public class RedisStore : IRedisStore
{
    private const string CacheKey = "places";
    private readonly IDistributedCache _cache;

    public RedisStore(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task CreatePlace(Place place)
    {
        var places = await GetPlaces();
        places = places.Append(place);

        var serializedPlaces = JsonSerializer.Serialize(places);
        await _cache.SetStringAsync(CacheKey, serializedPlaces);
    }

    public async Task<Place> GetPlace(string id)
    {
        var places = await GetPlaces();
        return places.FirstOrDefault(p => p.Id == id);
    }

    public async Task<IEnumerable<Place>> GetPlaces()
    {
        var cachedPlaces = await _cache.GetStringAsync(CacheKey);

        IEnumerable<Place> places = !string.IsNullOrEmpty(cachedPlaces)
            ? JsonSerializer.Deserialize<IEnumerable<Place>>(cachedPlaces)
            : [];

        return places;
    }

    public async Task RemovePlace(string id)
    {
        var places = (await GetPlaces()).ToList();
        Console.WriteLine("--> Count init {0}", places.Count());
        
        places.RemoveAll(p => p.Id == id);

        Console.WriteLine("--> Count after remove {0}", places.Count());
        var serializedPlaces = JsonSerializer.Serialize(places);

        await _cache.SetStringAsync(CacheKey, serializedPlaces);
    }
}
