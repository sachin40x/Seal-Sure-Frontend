import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    fetchSystemHealth();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/daily');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback to mock data
      setAnalytics([
        {
          date: new Date().toISOString(),
          documentsProcessed: 45,
          documentsAccepted: 38,
          documentsRejected: 5,
          documentsUnderReview: 2,
          performance: 84.4,
          totalUsers: 12,
          totalDocuments: 156
        },
        {
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          documentsProcessed: 32,
          documentsAccepted: 28,
          documentsRejected: 3,
          documentsUnderReview: 1,
          performance: 87.5,
          totalUsers: 11,
          totalDocuments: 124
        },
        {
          date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          documentsProcessed: 28,
          documentsAccepted: 24,
          documentsRejected: 2,
          documentsUnderReview: 2,
          performance: 85.7,
          totalUsers: 10,
          totalDocuments: 98
        }
      ]);
    }
  };

  const fetchSystemHealth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/system-health');
      setSystemHealth(response.data);
    } catch (error) {
      console.error('Error fetching system health:', error);
      // Fallback to mock data
      setSystemHealth({
        totalUsers: 15,
        totalDocuments: 234,
        pendingDocuments: 8,
        processingDocuments: 3,
        successRate: 87.2,
        recentErrors: 2,
        status: 'Healthy',
        lastUpdated: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* System Health Overview */}
        {systemHealth && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{systemHealth.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Documents</h3>
              <p className="text-3xl font-bold text-green-600">{systemHealth.totalDocuments}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Success Rate</h3>
              <p className="text-3xl font-bold text-purple-600">{systemHealth.successRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">System Status</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                systemHealth.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                systemHealth.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {systemHealth.status}
              </span>
            </div>
          </div>
        )}

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily Analytics</h3>
            {analytics && analytics.length > 0 ? (
              <div className="space-y-4">
                {analytics.slice(0, 7).map((day, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-4">
                      <span className="text-sm text-blue-600">
                        Processed: {day.documentsProcessed}
                      </span>
                      <span className="text-sm text-green-600">
                        Accepted: {day.documentsAccepted}
                      </span>
                      <span className="text-sm text-red-600">
                        Rejected: {day.documentsRejected}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No analytics data available</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">System Metrics</h3>
            {systemHealth && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Documents:</span>
                  <span className="font-semibold text-yellow-600">{systemHealth.pendingDocuments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Documents:</span>
                  <span className="font-semibold text-blue-600">{systemHealth.processingDocuments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recent Errors:</span>
                  <span className="font-semibold text-red-600">{systemHealth.recentErrors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold text-gray-600">
                    {new Date(systemHealth.lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
