import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  token: string;
}

export type UserLoginParams = Pick<User, 'email' | 'password'>;
export type UserLoginResponse = ApiResponse<{ user: Pick<User, 'token'> }>;
