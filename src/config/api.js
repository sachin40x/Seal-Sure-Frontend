// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://seal-sure-api-1.onrender.com';
const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL || 'https://seal-sure-api-1.onrender.com';

// Fallback API URLs
const FALLBACK_API_URL = 'https://seal-sure-api-1.onrender.com';

// Function to get API URL with fallback
const getApiUrl = () => {
    return API_BASE_URL;
};

const getFallbackApiUrl = () => {
    return FALLBACK_API_URL;
};

export { API_BASE_URL, PYTHON_API_URL, getApiUrl, getFallbackApiUrl };
