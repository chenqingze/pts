import {environment} from '../../../environments/environment';

const baseUrl = environment.endpoint
export const HttpApi = {
  uploads: `${baseUrl}/uploads`,
  test: `${baseUrl}/test`,
  register: `${baseUrl}/register`,
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/logout`,
  products: `${baseUrl}/products`,
};

