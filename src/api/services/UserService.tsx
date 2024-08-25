// src/api/services/UserService.ts
import { User } from '../../types/User';
import OmsApiClient from '../clients/OmsApiClient';

class UserService {
    private httpClient: OmsApiClient;

    constructor(httpClient: OmsApiClient) {
        this.httpClient = httpClient;
    }

    async getUser(userId: string): Promise<User> {
        return this.httpClient.get<User>(`/users/${userId}`);
    }

    async createUser(data: Partial<User>): Promise<User> {
        return this.httpClient.post<Partial<User>, User>('/users', data);
    }
}

export default UserService;
