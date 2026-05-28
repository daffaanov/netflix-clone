package com.streamflix.controller;

import jakarta.validation.constraints.NotBlank;
import com.streamflix.service.TmdbService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tmdb")
public class TmdbController {
    private final TmdbService tmdbService;

    public TmdbController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/trending")
    public String trending() {
        return tmdbService.get("/trending/all/week");
    }

    @GetMapping("/movies/popular")
    public String popularMovies() {
        return tmdbService.get("/movie/popular");
    }

    @GetMapping("/tv/popular")
    public String popularTv() {
        return tmdbService.get("/tv/popular");
    }

    @GetMapping("/search")
    public String search(@RequestParam @NotBlank String query) {
        return tmdbService.get("/search/multi", "query", query);
    }
}
