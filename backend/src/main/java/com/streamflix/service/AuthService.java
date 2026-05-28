package com.streamflix.service;

import com.streamflix.dto.AuthDtos.AuthResponse;
import com.streamflix.dto.AuthDtos.LoginRequest;
import com.streamflix.dto.AuthDtos.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
