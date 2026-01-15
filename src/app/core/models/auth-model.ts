// src/app/models/auth.model.ts

/**
 * Request body for logging in a user
 */
export interface LoginRequest {
    username: string;
    password: string;
    expiresInMins?: number; // optional, defaults to 60
  }
  
  /**
   * Response received after login
   */
  export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | string;
    image: string;
    accessToken: string;   // JWT access token
    refreshToken: string;  // JWT refresh token
  }
  
  /**
   * Response received when fetching current authenticated user
   * via GET /auth/me
   */
  export interface AuthUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | string;
    image: string;
    // tokens are optional here because /auth/me may not return them
    accessToken?: string;
    refreshToken?: string;
  }
  