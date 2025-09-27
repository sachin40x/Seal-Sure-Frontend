// import React, { useState } from 'react';
// import axios from 'axios';

// const DetectImageUpload = () => {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);

//   // Handle image selection
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData to send the image
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       // Send the image to the backend
//       const response = await axios.post('http://localhost:3000/api/detect/detect-manipulation', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Set the result
//       setResult(response.data);
//     } catch (error) {
//       console.error('Error detecting manipulation:', error);
//       setResult({ error: 'An error occurred' });
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Upload an Image for Manipulation Detection</h2>

//       {/* Image Upload Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input 
//             type="file" 
//             onChange={handleImageChange} 
//             className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
//           />
//         </div>

//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
//         >
//           Detect Manipulation
//         </button>
//       </form>

//       {/* Result */}
//       {result && (
//         <div className="mt-6">
//           <h3 className="text-xl font-medium text-gray-700">Result:</h3>
//           <p className={`mt-2 ${result.manipulationDetected ? 'text-red-500' : 'text-green-500'}`}>
//             {result.message || result.error}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DetectImageUpload;
