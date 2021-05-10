import React, { useContext } from 'react';
import { ErrorContext } from '../ErrorContext';

export function useErrorOutlet() {
    const errorCtx = useContext(ErrorContext);
    return errorCtx.setError;
}