using Refit;

namespace WeatherApi.Infrastructure.GeminiServices;

public interface IGeminiService
{
    [Post("/{model}:generateContent?key={key}")]
    Task<GeminiResponse> TextGeneration([Body] GeminiRequestBody requestBody, string model, string key);
}
