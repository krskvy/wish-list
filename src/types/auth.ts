import { AlertProps } from '@mui/material';

export type Severity = AlertProps['severity'];

export type alertStatusType = {
	severity: Severity,
	message: string
}

export interface User {
  username: string;
  password: string;
}
