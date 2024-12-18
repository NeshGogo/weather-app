namespace WeatherApi.Infrastructure.WeatherService;

public record WeatherApiModel(CurrentWeather Current, Hourly hourly, Daily daily);

public record CurrentWeather(Precipitation Precipitation, decimal Temperature, int Icon_num, string Summary);

public record Precipitation(decimal Total);

public record Hourly(IEnumerable<DataHourlyPregression> Data);
public record Daily(IEnumerable<DataDailyPregression> Data);

public record DataHourlyPregression(DateTime Date, int Icon, decimal Temperature);

public record DataDailyPregression(DateTime Day, int Icon, AllDayTemperaturePregression All_day);

public record AllDayTemperaturePregression(decimal Temperature_max, decimal Temperature_min);