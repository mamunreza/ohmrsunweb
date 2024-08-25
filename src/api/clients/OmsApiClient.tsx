import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({ baseURL });
    }

    // GET method with explicit types
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, config);
        return response.data;
    }

    // POST method with explicit types
    public async post<T, R = T>(url: string, data: T, config?: AxiosRequestConfig): Promise<R> {
        const response: AxiosResponse<R> = await this.client.post(url, data, config);
        return response.data;
    }

    // Other HTTP methods (PUT, DELETE) can follow the same pattern
}

export default HttpClient;
