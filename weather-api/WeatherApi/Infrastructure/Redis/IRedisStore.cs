﻿using WeatherApi.Models;

namespace WeatherApi.Infrastructure.Redis;

public interface IRedisStore
{
    Task<IEnumerable<Place>> GetPlaces();
    Task CreatePlace(Place place);
    Task RemovePlace(string id);
}
