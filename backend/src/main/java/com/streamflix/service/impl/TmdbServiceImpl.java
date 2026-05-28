package com.streamflix.service.impl;

import com.streamflix.service.TmdbService;
import java.net.URI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class TmdbServiceImpl implements TmdbService {
    private final String apiKey;
    private final String baseUrl;
    private final RestClient restClient;

    public TmdbServiceImpl(@Value("${tmdb.api.key}") String apiKey,
            @Value("${tmdb.base-url}") String baseUrl,
            RestClient.Builder restClientBuilder) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.restClient = restClientBuilder.build();
    }

    @Override
    public String get(String path) {
        return get(path, null, null);
    }

    @Override
    public String get(String path, String paramName, String paramValue) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "TMDB_API_KEY is not configured.");
        }

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(baseUrl + path)
                .queryParam("api_key", apiKey)
                .queryParam("language", "en-US");

        if (paramName != null && paramValue != null) {
            builder.queryParam(paramName, paramValue);
        }

        URI uri = builder.build().encode().toUri();
        return restClient.get()
                .uri(uri)
                .retrieve()
                .body(String.class);
    }
}
