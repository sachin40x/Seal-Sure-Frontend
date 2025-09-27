import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('nodejs');
    const [showModal, setShowModal] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [apiKey, setApiKey] = useState("your-generated-api-key"); // Initial API key
    const [isLoading, setIsLoading] = useState(false);  // State to manage loading state for the generate button
    const token = localStorage.getItem('token');

    const handleGetStarted = () => {
        navigate('/homepage');
    };

    const handleGetAPIKey = () => {
        if (!token) {
            setShowLoginPrompt(true);
        } else {
            setShowModal(true);
        }
    };

    const handleLogin = () => {
        navigate('/signin');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey).then(() => {
            alert('API Key copied to clipboard!');
        });
    };

    const handleGenerateApiKey = () => {
        // Simulate API key generation with a delay and 32-bit hex generation
        setIsLoading(true);

        setTimeout(() => {
            const newApiKey = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            setApiKey(newApiKey);
            setIsLoading(false);
        }, 1000); // Add a delay to simulate the process (1 second)
    };

    const codeExamples = {
        nodejs: `const fetch = require('node-fetch');

fetch('https://api.sealsure.com/data', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})
.then(response => response.json())
.then(data => console.log(data));`, 

        python: `import requests

url = 'https://api.sealsure.com/data'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}
response = requests.get(url, headers=headers)
data = response.json()
print(data)`, 

        java: `import java.net.HttpURLConnection;
import java.net.URL;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Main {
    public static void main(String[] args) throws Exception {
        String url = "https://api.sealsure.com/data";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization", "Bearer YOUR_API_KEY");

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println(response.toString());
    }
}`,
    };

    const notes = {
        nodejs: [
            'Ensure that you have installed the "node-fetch" package using "npm install node-fetch".',
            'Make sure to replace "YOUR_API_KEY" with the actual API key to authenticate your request.',
            'Node.js is asynchronous, so make sure you handle the promises properly as shown in the example.'
        ],

        python: [
            'The "requests" library is a simple way to make HTTP requests. You can install it using "pip install requests".',
            'Replace "YOUR_API_KEY" with the actual API key to authenticate your request.',
            'Python\'s "requests" module handles responses in a blocking manner, making it easier to work with.'
        ],

        java: [
            'Java requires additional setup like "HttpURLConnection" for HTTP requests.',
            'Make sure to replace "YOUR_API_KEY" with your actual API key for authentication.',
            'Java can be verbose compared to Node.js or Python, but it\'s reliable and widely used in enterprise environments.'
        ],
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
                {/* Hero Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-6 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to SealSure API Services!</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Integrate powerful document verification services with ease.
                    </p>
                    <div className="mb-6">
                        <button
                            onClick={handleLogin}
                            className="bg-blue-900 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-900 transition duration-300 mr-4"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleGetAPIKey}
                            className="bg-gray-300 text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300"
                        >
                            Get API Key
                        </button>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white p-8 mt-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Key Features</h2>
                    <div className="flex justify-between space-x-8">
                        <div>
                            <h3 className="text-xl font-semibold text-blue-900">Effortless Integration</h3>
                            <p className="text-lg text-gray-600">Seamlessly add document verification into your platform.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-900">Secure & Reliable</h3>
                            <p className="text-lg text-gray-600">Ensure top-tier security with real-time verification.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-900">Customizable Workflow</h3>
                            <p className="text-lg text-gray-600">Adapt to your specific use case with flexible API options.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-blue-900 text-white p-6 text-center mt-8">
                    <h3 className="text-3xl font-bold mb-4">Get Started Today</h3>
                    <p className="text-lg mb-4">Build smarter with SealSure's API solutions.</p>
                    <button
                        onClick={handleLogin}
                        className="bg-white text-blue-900 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
                    >
                        Join Now
                    </button>
                </div>

                {/* Login Prompt Modal */}
                {showLoginPrompt && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-2xl font-bold text-blue-900 mb-4">Login Required</h2>
                            <p className="text-lg text-gray-600 mb-4">
                                You need to log in to access your API key.
                            </p>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-900 text-white py-2 px-6 rounded-lg shadow-lg"
                                >
                                    Log In
                                </button>
                            </div>
                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                className="bg-gray-300 text-black py-2 px-4 rounded-lg w-full mt-4"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
                <div className="w-1/2 pr-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome Back to SealSure</h1>
                    <p className="text-lg mb-6 text-gray-600">
                        Ready to enhance your document verification experience?
                    </p>
                    <div className="mb-4">
                        <button
                            onClick={handleGetStarted}
                            className="bg-blue-900 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-900 transition duration-300 mr-4"
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={handleGetAPIKey}
                            className="bg-gray-300 text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300"
                        >
                            Get API Key
                        </button>
                    </div>

                    {/* Display Notes as Bullet Points */}
                    <div className="mt-6 text-gray-600">
                        <ul className="list-disc pl-6">
                            {notes[selectedLanguage].map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-1/2">
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setSelectedLanguage('nodejs')}
                            className={`py-2 px-4 rounded-lg ${selectedLanguage === 'nodejs' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
                        >
                            Node.js
                        </button>
                        <button
                            onClick={() => setSelectedLanguage('python')}
                            className={`py-2 px-4 rounded-lg ${selectedLanguage === 'python' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
                        >
                            Python
                        </button>
                        <button
                            onClick={() => setSelectedLanguage('java')}
                            className={`py-2 px-4 rounded-lg ${selectedLanguage === 'java' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
                        >
                            Java
                        </button>
                    </div>

                    <div className="relative">
                        <button
                            onClick={handleCopy}
                            className="absolute right-4 top-4 bg-blue-900 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-900 transition duration-300"
                        >
                            Copy
                        </button>
                        <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto overflow-y-auto h-80 whitespace-pre-wrap">
                            {codeExamples[selectedLanguage]}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Modal for API Key or Login */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">
                            {token ? 'Your API Key' : 'Please Log In'}
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">
                            {token
                                ? 'Here is your API key. Keep it secure!'
                                : 'You need to log in to access your API key.'}
                        </p>
                        {token ? (
                            <>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        value={apiKey}
                                        readOnly
                                        className="bg-gray-200 text-gray-600 p-2 rounded-lg w-full mr-2"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="bg-blue-900 text-white py-2 px-4 rounded-lg"
                                    >
                                        Copy
                                    </button>
                                </div>
                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerateApiKey}
                                    className="bg-blue-900 text-white py-2 px-6 rounded-lg w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="loader"></div> // Display a loader/spinner
                                    ) : (
                                        'Generate API Key'
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-900 text-white py-2 px-6 rounded-lg shadow-lg"
                                >
                                    Log In
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 text-black py-2 px-4 rounded-lg w-full mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
