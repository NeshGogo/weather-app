FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY ["weather-api/WeatherApi/*.csproj", "./"] 
RUN dotnet restore

COPY  ["weather-api/WeatherApi/", "./"] 

RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

COPY --from=build /publish .

EXPOSE 8010

ENTRYPOINT ["dotnet", "WeatherApi.dll"]
