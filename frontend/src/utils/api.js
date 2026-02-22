import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const analyzeCode = async (sourceCode) => {
    const response = await api.post('/analyzer/analyze', { sourceCode });
    return response.data;
};

export const getTransitionTable = async () => {
    const response = await api.get('/analyzer/transition-table');
    return response.data;
};

export const getTokenTypes = async () => {
    const response = await api.get('/analyzer/token-types');
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/history');
    return response.data;
};

export const clearHistory = async () => {
    const response = await api.delete('/history');
    return response.data;
};

export const deleteHistoryItem = async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
};

export default api;
