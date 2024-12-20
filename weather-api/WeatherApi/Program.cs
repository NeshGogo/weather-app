using WeatherApi.Endpoints;
using WeatherApi.Infrastructure.Redis;
using WeatherApi.Infrastructure.WeatherService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddWeatherService(builder.Configuration);
builder.Services.AddCors();
builder.Services.AddRedisStore(builder.Configuration);

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}

app.RegisterEndpoints();

app.Run();
