namespace WeatherApi.Infrastructure.GeminiServices;

public record GeminiRequestBody(IEnumerable<GeminiContent> Contents);

public record GeminiResponse(IEnumerable<GeminiCandidates> Candidates);

public record GeminiCandidates(GeminiContent Content);

public record GeminiContent(IEnumerable<GeminiPart> Parts);

public record GeminiPart(string Text);