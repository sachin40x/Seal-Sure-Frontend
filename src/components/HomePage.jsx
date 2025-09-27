import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Dashboard from './Dashboard';

function HomePage() {
  return (
    <div className="p-4">
      <Dashboard />
      
      {/* Button to navigate to AcceptanceRejection page */}
      <div className="mt-5">
        <Link to="/acceptance-rejection">
          <button className="px-6 py-2 bg-blue-950 text-white rounded hover:bg-blue-800">
            Go to Acceptance and Rejection
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
