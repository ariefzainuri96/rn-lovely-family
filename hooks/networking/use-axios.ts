import { useAuth } from '@/features/auth-context';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url, data } = config;

  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  if (data) {
    console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request => ${JSON.stringify(data)}`);
  }

  // if (method === 'get') {
  //   config.timeout = 15000;
  // }
  return config;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { statusText, status } = (error.response as AxiosResponse) ?? {};

    console.log(`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`);

    switch (status) {
      case 401: {
        // "Login required"
        break;
      }
      case 403: {
        // "Permission denied"
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        // "Unknown error occurred"
        break;
      }
    }

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
    }
  } else {
    console.log(`🚨 [API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  console.log(
    `🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status} => ${JSON.stringify(response.data)}`
  );

  return response;
};

export default function useAxios() {
  const auth = useAuth();

  const axiosInstance = axios.create({
    baseURL: 'http://192.168.165.161:9000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  });

  axiosInstance.interceptors.request.use(onRequest, onErrorResponse);
  axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

  return axiosInstance;
}
