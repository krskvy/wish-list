import React from 'react';
import { Alert} from '@mui/material';
import { Severity } from '../types';

const AlertMessage: React.FC<{severity: Severity; message: string}> = ({severity, message}) => {
	return (
		<Alert className='alert-message' {...{severity}}> {message} </Alert>
	);
}

export default AlertMessage;