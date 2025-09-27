import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import ApiHealthCheck from './ApiHealthCheck';

function Signin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            console.log('Attempting to sign in with:', API_BASE_URL);
            const response = await axios.post(`${API_BASE_URL}/api/signin`, formData, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const { token, username } = response.data;
                localStorage.setItem('token', token);
                if (username) {
                    localStorage.setItem('username', username);
                }
                navigate('/');
            }
        } catch (error) {
            console.error('Signin error:', error);
            if (error.response && error.response.status === 404) {
                setError('Authentication endpoints not configured on backend. Please contact administrator.');
            } else if (error.response) {
                console.error('Response error:', error.response.data);
                setError(error.response.data.message || 'Invalid credentials. Please try again.');
            } else if (error.request) {
                console.error('Request error:', error.request);
                setError('No response from the server. Please check your internet connection and try again.');
            } else if (error.code === 'ECONNABORTED') {
                setError('Request timeout. Please try again.');
            } else {
                console.error('Other error:', error.message);
                setError('An error occurred. Please try again.');
            }
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-900 mb-6">Sign in</h1>
                <ApiHealthCheck />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-900 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-10">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Signin;
