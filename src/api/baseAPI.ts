import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

const {
  REACT_APP_API_URL: BASE_URL,
  REACT_APP_API_KEY: API_KEY,
  REACT_APP_API_TIMEOUT: API_TIMEOUT,
} = process.env;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY ? { 'api-key': API_KEY } : {}),
  },
  timeout: API_TIMEOUT ? Number(API_TIMEOUT) : 8000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: Error) => {
    console.error(
      'There was an error while running the request',
      error.message
    );
  }
);

const convertToApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return new Error(error.response?.data?.message || error.message);
  }
  throw error;
};

export default abstract class BaseAPI {
  abstract get moduleUrl(): string;

  protected async get(
    url = '',
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await axiosInstance.get(`${this.moduleUrl}${url}`, config);
    } catch (error) {
      throw convertToApiError(error);
    }
  }

  protected async post(
    url: string,
    // Explicitly setting data values as any to keep the generic method simple.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await axiosInstance.post(`${this.moduleUrl}${url}`, data, config);
    } catch (error) {
      throw convertToApiError(error);
    }
  }

  protected async put(
    url: string,
    // Explicitly setting data values as any to keep the generic method simple.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await axiosInstance.put(`${this.moduleUrl}${url}`, data, config);
    } catch (error) {
      throw convertToApiError(error);
    }
  }

  protected async patch(
    url: string,
    // Explicitly setting data values as any to keep the generic method simple.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await axiosInstance.patch(`${this.moduleUrl}${url}`, data, config);
    } catch (error) {
      throw convertToApiError(error);
    }
  }

  protected async delete(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await axiosInstance.delete(`${this.moduleUrl}${url}`, config);
    } catch (error) {
      throw convertToApiError(error);
    }
  }
}
