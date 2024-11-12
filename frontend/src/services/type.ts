
export interface ErrorMessage {
  field: string;
  message: string;
}

export interface User {
  username: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
