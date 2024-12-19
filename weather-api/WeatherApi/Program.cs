using WeatherApi.Endpoints;
using WeatherApi.Infrastructure.WeatherService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddWeatherService(builder.Configuration);
builder.Services.AddCors();

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}

app.RegisterEndpoints();

app.Run();
