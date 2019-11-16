import { ISAConfig } from '@admin/models/interfaces/config';

export const saConfig: ISAConfig = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
};
