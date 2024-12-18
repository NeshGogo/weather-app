using WeatherApi.Endpoints;
using WeatherApi.Infrastructure.WeatherService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddWeatherService(builder.Configuration);

var app = builder.Build();

app.RegisterEndpoints();

app.Run();
