import qs from 'qs';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import StorageService from '@commons/services/storage.service';
import validator from 'validator';
import isEmpty = validator.isEmpty;

/**
 * 取消请求
 */
const CancelToken = axios.CancelToken;
const cancels: Canceler[] = [];
const cancelAllRequest = (message?: string) => {
    cancels.forEach((cancel) => cancel(message));
};

/**
 * 设置全局参数
 */
axios.defaults.timeout = 300000;
// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = false;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 封装实例
 */
const http = axios.create({});

/**
 * axios超时判断
 */
const isTimeoutError = (err: AxiosError) => err.code === 'ECONNABORTED' && err.message.includes('timeout');

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

interface ResponseInterceptorManager<AxiosResponse> {
    errorHandler?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
}

/**
 * Response
 */
const setupResponseInterceptor = (manager: ResponseInterceptorManager<AxiosResponse> = {}) => {};

/**
 * 默认设置
 */
const setupAxios = () => {
    setupAuthorizationInterceptor();
    setupResponseInterceptor();
};

/**
 * 文件上传的表单头信息
 */
const postMultipartHeaders: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data: any) => {
        return data;
    },
};

/**
 * 文件上传的表单头信息
 */
const postFormHeaders: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data: any) => {
        return data;
    },
};

/**
 * Json数据的表单头信息
 */
const postJsonHeaders: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: (data: any) => {
        return JSON.stringify(data);
    },
};

/**
 * 表单头信息
 */
const postHeaders: AxiosRequestConfig = {
    transformRequest: (data: any, headers: any) => {
        return qs.stringify(data);
    },
    paramsSerializer: (data: any = {}) => {
        return qs.stringify(data);
    },
};

// Get
const get = <T = any, P = any, R = AxiosResponse<T>>(
    url: string,
    params?: P,
    config: AxiosRequestConfig = {},
): Promise<R> => {
    config.params = params || {};
    return http.get(url, {
        cancelToken: new CancelToken((cancel) => {
            cancels.push(cancel);
        }),
        ...config,
    });
};

// Post
const post = <T = any, P = any, R = AxiosResponse<T>>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = postHeaders,
): Promise<R> => {
    return http.post(url, data || {}, {
        cancelToken: new CancelToken((cancel) => {
            cancels.push(cancel);
        }),
        ...config,
    });
};

// Post
const postJson = <T = any, P = any, R = AxiosResponse<T>>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = postJsonHeaders,
): Promise<R> => {
    return http.post(url, data || {}, {
        cancelToken: new CancelToken((cancel) => {
            cancels.push(cancel);
        }),
        ...config,
    });
};

// Post FormBody
const postForm = <T = any, R = AxiosResponse<T>>(
    url: string,
    data: FormData = new FormData(),
    config: AxiosRequestConfig = postFormHeaders,
): Promise<R> => {
    return http.post(url, data, {
        cancelToken: new CancelToken((cancel) => {
            cancels.push(cancel);
        }),
        ...config,
    });
};

// Upload
const postMultiple = <T = any, P = any, R = AxiosResponse<T>>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = postMultipartHeaders,
): Promise<R> => {
    return http.post(url, data || {}, {
        cancelToken: new CancelToken((cancel) => {
            cancels.push(cancel);
        }),
        ...config,
    });
};

export default http;
export { axios, isTimeoutError, get, post, postForm, postJson, postMultiple };
export { postHeaders, postFormHeaders, postJsonHeaders, postMultipartHeaders };
export { cancelAllRequest, cancels, CancelToken };
