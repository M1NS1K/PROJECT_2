package com.springweb.study.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.token-validity}")
	private long tokenValidity;

	// JWT에서 사용자 이름을 추출하는 메서드
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	// JWT에서 특정 클레임을 추출하는 메서드
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	// JWT에서 모든 클레임을 추출하는 메서드
	private Claims extractAllClaims(String token) {
		return Jwts.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody();
	}

	// 토큰이 만료되었는지 확인하는 메서드
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	// JWT 토큰에서 만료 날짜를 추출하는 메서드
	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	// JWT 토큰을 생성하는 메서드
	public String generateToken(Authentication authentication) {
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", userDetails.getAuthorities());

		return Jwts.builder()
				.setClaims(claims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + tokenValidity))
				.signWith(SignatureAlgorithm.HS512, secretKey)
				.compact();
	}

	// JWT 토큰의 유효성을 검증하는 메서드
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
