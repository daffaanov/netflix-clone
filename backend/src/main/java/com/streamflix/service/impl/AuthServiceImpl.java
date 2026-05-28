package com.streamflix.service.impl;

import com.streamflix.dto.AuthDtos.AuthResponse;
import com.streamflix.dto.AuthDtos.LoginRequest;
import com.streamflix.dto.AuthDtos.RegisterRequest;
import com.streamflix.dto.AuthDtos.UserResponse;
import com.streamflix.entity.User;
import com.streamflix.repository.UserRepository;
import com.streamflix.security.JwtService;
import com.streamflix.service.AuthService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        User saved = userRepository.save(user);

        return new AuthResponse(jwtService.generateToken(saved), UserResponse.from(saved));
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password.");
        }

        return new AuthResponse(jwtService.generateToken(user), UserResponse.from(user));
    }
}
