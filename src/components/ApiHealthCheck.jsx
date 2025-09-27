import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import axios from 'axios';

const ApiHealthCheck = () => {
    const [healthStatus, setHealthStatus] = useState('checking');
    const [error, setError] = useState(null);

    useEffect(() => {
        checkApiHealth();
    }, []);

    const checkApiHealth = async () => {
        try {
            console.log('Checking API health for:', API_BASE_URL);
            const response = await axios.get(`${API_BASE_URL}/health`, {
                timeout: 5000,
            });
            
            if (response.status === 200) {
                setHealthStatus('healthy');
                setError(null);
            }
        } catch (error) {
            console.error('API Health Check Error:', error);
            setHealthStatus('unhealthy');
            
            if (error.code === 'ECONNABORTED') {
                setError('API timeout - Server may be slow or unresponsive');
            } else if (error.request) {
                setError('No response from server - Check if backend is running');
            } else if (error.response) {
                setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
            } else {
                setError(`Connection error: ${error.message}`);
            }
        }
    };

    const getStatusColor = () => {
        switch (healthStatus) {
            case 'healthy': return 'text-green-600';
            case 'unhealthy': return 'text-red-600';
            default: return 'text-yellow-600';
        }
    };

    const getStatusIcon = () => {
        switch (healthStatus) {
            case 'healthy': return '✅';
            case 'unhealthy': return '❌';
            default: return '⏳';
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">API Health Check</h3>
            <div className="flex items-center space-x-2">
                <span className="text-2xl">{getStatusIcon()}</span>
                <span className={`font-medium ${getStatusColor()}`}>
                    {healthStatus === 'checking' ? 'Checking...' : 
                     healthStatus === 'healthy' ? 'API is healthy' : 'API is unhealthy'}
                </span>
            </div>
            {error && (
                <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700">
                    <strong>Error:</strong> {error}
                </div>
            )}
            <div className="mt-2 text-sm text-gray-600">
                <strong>API URL:</strong> {API_BASE_URL}
            </div>
            <button 
                onClick={checkApiHealth}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
                Retry Check
            </button>
        </div>
    );
};

export default ApiHealthCheck;
