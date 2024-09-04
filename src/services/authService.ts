import axios from 'axios';


export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_OMS_AUTH_API_URL}/auth/login`, {
            email,
            password,
        });
        const { token } = response.data;
        return token;
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
}

export const logout = () => {
    localStorage.removeItem('token');
}
