import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { isEmpty } from 'lodash';
//
import StorageService from '@commons/services/storage.service';
import environment from '@commons/utils/environment';

/**
 * 取消请求
 */
const CancelToken = axios.CancelToken;
const cancels: Canceler[] = [];
const cancelAllRequest = (message?: string) => {
    cancels.forEach((cancel) => cancel(message));
};

/**
 * 超时判断
 */
const isTimeoutError = (error: AxiosError) => error.code === 'ECONNABORTED' && error.message.includes('timeout');

/**
 * 设置全局参数
 */
axios.defaults.timeout = 300000;
axios.defaults.withCredentials = true;

/**
 * 创建实例
 */
const http = axios.create({
    baseURL: environment.server,
});

const cancelRequestConfig: AxiosRequestConfig = {
    cancelToken: new CancelToken((cancel) => {
        cancels.push(cancel);
    }),
};

/**
 * Get
 */
const getRequestConfig: AxiosRequestConfig = {
    ...cancelRequestConfig,
};

function get<T = any, R = AxiosResponse<T>>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = getRequestConfig,
): Promise<R> {
    config.params = params;
    return http.get(url, config);
}

/**
 * Post
 */
const postRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...cancelRequestConfig,
};

function post<T = any, R = AxiosResponse<T>>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = postRequestConfig,
): Promise<R> {
    return http.post(url, data, config);
}

/**
 * Post Json
 */
const postJsonRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: (data: any) => {
        return JSON.stringify(data);
    },
    ...cancelRequestConfig,
};

function postJson<T = any, R = AxiosResponse<T>>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = postJsonRequestConfig,
): Promise<R> {
    return http.post(url, data, config);
}

/**
 * Post FormBody
 */
const postFormRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...cancelRequestConfig,
};

function postForm<T = any, R = AxiosResponse<T>>(
    url: string,
    data: FormData = new FormData(),
    config: AxiosRequestConfig = postFormRequestConfig,
): Promise<R> {
    return http.post(url, data, config);
}

/**
 * Post Multipart
 */
const postMultipartRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    ...cancelRequestConfig,
};

function postMultipart<T = any, R = AxiosResponse<T>>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = postMultipartRequestConfig,
): Promise<R> {
    return http.post(url, data, config);
}

/**
 * Authorization
 */
const setupAuthorizationInterceptor = () => {
    http.interceptors.request.use(async (config: AxiosRequestConfig) => {
        const token = await StorageService.getAccessToken();
        if (isEmpty(token)) {
            config.headers.common.Authorization = null;
        } else {
            config.headers.common.Authorization = `Bearer ${token}`;
        }
        console.log(`Authorization ${config.headers.common.Authorization}`);
        return config;
    });
};

/**
 * Response
 */
interface ResponseInterceptorManager<AxiosResponse> {
    exceptionHandler?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    timeoutHandler?: (error: AxiosError) => AxiosError | Promise<AxiosError>;
    errorHandler?: (error: AxiosError) => AxiosError | Promise<AxiosError>;
}

const setupResponseInterceptor = (manager: ResponseInterceptorManager<AxiosResponse> = {}) => {
    http.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response) {
                const response = error.response as AxiosResponse;
                if (manager && manager.exceptionHandler) {
                    manager.exceptionHandler(response);
                }
            } else {
                if (isTimeoutError(error)) {
                    if (manager && manager.timeoutHandler) {
                        manager.timeoutHandler(error);
                    }
                } else {
                    if (manager && manager.errorHandler) {
                        manager.errorHandler(error);
                    }
                }
            }
            return Promise.reject(error);
        },
    );
};

/**
 * 默认设置
 */
const setupAxios = () => {
    setupAuthorizationInterceptor();
    setupResponseInterceptor();
};

export default http;

export { axios, isTimeoutError, get, post, postForm, postJson, postMultipart };

export {
    getRequestConfig,
    postRequestConfig,
    postFormRequestConfig,
    postJsonRequestConfig,
    postMultipartRequestConfig,
};

export { setupAxios, setupAuthorizationInterceptor, setupResponseInterceptor };

export { cancelAllRequest, cancels, CancelToken };
