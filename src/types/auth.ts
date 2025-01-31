import { AlertProps } from '@mui/material';

export type Severity = AlertProps['severity'];

export type alertStatusType = {
	severity: Severity,
	message: string
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed" | "logged_out" | "registered";
}

export type Wish = {
  id: string;
  text: string;
}