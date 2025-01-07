import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ResponseAlertProps {
    open: boolean;
    onClose: () => void;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

const ResponseAlert: React.FC<ResponseAlertProps> = ({ open, onClose, type, message }) => {
    return (
        <Snackbar open={open} onClose={onClose} autoHideDuration={6000}>
            <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default ResponseAlert;
