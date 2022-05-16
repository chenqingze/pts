import {environment} from '../../../environments/environment';

const baseUrl = environment.endpoint
export const HttpApi = {
    baseUrl: baseUrl,
    uploads: `${baseUrl}/uploads`,
    test: `${baseUrl}/test`,
    register: `${baseUrl}/register`,
    login: `${baseUrl}/login`,
    logout: `${baseUrl}/logout`,
    products: `${baseUrl}/products`,
    goods: `${baseUrl}/goods`,
    logistics: `${baseUrl}/logistics`,
};

