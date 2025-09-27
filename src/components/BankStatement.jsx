import React, { useState } from 'react';

const BankStatement = () => {
    const [image, setImage] = useState(null);
    const [detectedTables, setDetectedTables] = useState([]);
    const [resultImageUrl, setResultImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [validationResult, setValidationResult] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        if (!image) {
            alert('Please upload an image!');
            return;
        }

        const fileName = image.name;
        const fileExtension = image.type.split('/')[1]; // Get the file extension (e.g., 'png', 'jpg', etc.)

        // Check if file format is supported
        const supportedFormats = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
        if (!supportedFormats.includes(fileExtension.toLowerCase())) {
            setMessage('Unsupported file format. Please upload PNG, JPG, JPEG, GIF, or BMP files.');
            setDetectedTables([]);
            setResultImageUrl('');
            return;
        }

        setMessage('Processing image...');

        // Only make the API call if there is a problem detected
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch('http://localhost:5000/api/detect-tables', {
                method: 'POST',
                body: formData,
            });

            // Check for successful response
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                alert(data.error);
            } else {
                setDetectedTables(data.detected_tables);
                setResultImageUrl(`http://localhost:5000/api/outputs/${data.result_image}`);
                setValidationResult(data.validation);
                
                // Set appropriate message based on validation status
                if (data.validation.status === 'Valid') {
                    setMessage('✅ Document is VALID - Bank statement verified successfully!');
                } else if (data.validation.status === 'Invalid') {
                    setMessage('❌ Document is INVALID - Issues detected!');
                } else if (data.validation.status === 'Suspicious') {
                    setMessage('⚠️ Document is SUSPICIOUS - Requires manual review!');
                } else {
                    setMessage('Tables detected successfully!');
                }
            }
        } catch (error) {
            console.error('Error uploading the image:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Banking Statements Detection</h1>
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300">
                        Choose File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                    >
                        Detect Tables
                    </button>
                </div>

                {message && (
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-center text-blue-500 mb-4">{message}</h2>
                    </div>
                )}

                {resultImageUrl && (
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-center text-blue-500 mb-4">Result</h2>
                        <img src={resultImageUrl} alt="Detected tables" className="w-full rounded-lg shadow-md" />
                    </div>
                )}

                {/* Validation Results */}
                {validationResult && (
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-blue-500 mb-4">Document Validation Results</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">File Information</h3>
                                    <p className="text-sm text-gray-600">File: {validationResult.fileName}</p>
                                    <p className="text-sm text-gray-600">Size: {(validationResult.fileSize / 1024).toFixed(2)} KB</p>
                                    <p className="text-sm text-gray-600">Type: {validationResult.fileType}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Validation Status</h3>
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        validationResult.status === 'Valid' ? 'bg-green-100 text-green-800' :
                                        validationResult.status === 'Invalid' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {validationResult.status}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Confidence: {validationResult.confidence}%</p>
                                </div>
                            </div>
                            
                            {validationResult.issues.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold text-red-600 mb-2">Issues Found:</h4>
                                    <ul className="list-disc list-inside text-sm text-red-600">
                                        {validationResult.issues.map((issue, index) => (
                                            <li key={index}>{issue}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {validationResult.recommendations.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold text-green-600 mb-2">Recommendations:</h4>
                                    <ul className="list-disc list-inside text-sm text-green-600">
                                        {validationResult.recommendations.map((rec, index) => (
                                            <li key={index}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-xl font-medium text-blue-500 mb-4">Detected Tables</h2>
                    {detectedTables.length > 0 ? (
                        detectedTables.map((table, index) => (
                            <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
                                <p className="text-lg text-gray-700">
                                    Table {index + 1}: {`x: ${table.bbox[0]}, y: ${table.bbox[1]}, width: ${table.bbox[2]}, height: ${table.bbox[3]}`}
                                </p>
                                {table.type && (
                                    <p className="text-sm text-blue-600">Type: {table.type}</p>
                                )}
                                {table.confidence && (
                                    <p className="text-sm text-green-600">Confidence: {(table.confidence * 100).toFixed(1)}%</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No tables detected.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BankStatement;
