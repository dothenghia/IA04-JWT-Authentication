
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