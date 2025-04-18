export const baseUrl = 'http://localhost:8080';
const summaryApi = {
    register :{
        method: 'POST',
        url: '/api/user/register',
    },
    login: {
        method: 'POST',
        url: '/api/user/login',
    },
    forgotPassword: {
        method: 'PUT',
        url: '/api/user/forgot-password',
    },
    verifyOtp: {
        method: 'PUT',
        url: '/api/user/verify-forgot-password-otp',
    },
    resetPassword: {
        method: 'PUT',
        url: '/api/user/reset-password',
    },
    refreshToken: {
        method: 'POST',
        url: '/api/user/refresh-token',
    },
    userDetails: {
        method: 'GET',
        url: '/api/user/user-details',
    },
    logout: {
        method: 'GET',
        url: '/api/user/logout',
    },
}

export default summaryApi;