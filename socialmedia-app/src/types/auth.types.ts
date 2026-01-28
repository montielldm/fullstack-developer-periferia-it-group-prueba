export interface AuthResponse {
  user: User;
  access_token: string;
}
export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
}
