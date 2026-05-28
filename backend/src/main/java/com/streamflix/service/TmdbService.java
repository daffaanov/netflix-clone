package com.streamflix.service;

public interface TmdbService {
    String get(String path);

    String get(String path, String paramName, String paramValue);
}
