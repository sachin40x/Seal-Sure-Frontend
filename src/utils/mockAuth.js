// Mock Authentication for Development
// This is a temporary solution until backend endpoints are configured

export const mockSignin = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'admin@sealsure.com' && password === 'admin123') {
        return {
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            username: 'Admin User',
            message: 'Login successful (Mock Mode)'
        };
    } else if (email === 'test@test.com' && password === 'test123') {
        return {
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            username: 'Test User',
            message: 'Login successful (Mock Mode)'
        };
    } else {
        return {
            success: false,
            message: 'Invalid credentials (Mock Mode)'
        };
    }
};

export const mockSignup = async (username, email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password && username) {
        return {
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            username: username,
            message: 'Registration successful (Mock Mode)'
        };
    } else {
        return {
            success: false,
            message: 'Please fill all fields (Mock Mode)'
        };
    }
};

export const isBackendAvailable = async () => {
    try {
        const response = await fetch('https://seal-sure-api-1.onrender.com/health', {
            timeout: 5000
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};
