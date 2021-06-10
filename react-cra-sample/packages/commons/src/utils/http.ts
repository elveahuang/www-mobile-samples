import qs from 'qs';
import { IntlFormatters } from 'react-intl';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, Canceler } from 'axios';
import { isExcluded } from '@commons/utils';
import history from '@commons/utils/history';
import ApiResponse from '@commons/types/api-response';

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
 * 拦截器
 */
type TokenString = string;

type ToastParameters = Parameters<IntlFormatters['formatMessage']> | string[];

abstract class HttpInterceptors {
    /**
     * 是否正在刷新token
     */
    isRefreshing = false;

    /**
     * 重试请求队列
     */
    requests: Array<(token: string) => void> = [];

    /**
     * 不需要添加token的接口
     */
    excludeUrls = ['/oauth/token'];

    abstract clearToken(): void;

    abstract refreshToken(): Promise<TokenString>;

    abstract getAccessToken(): TokenString;

    abstract toast(...args: ToastParameters): void;

    requestInterceptor = -1;
    responseInterceptor = -1;

    init() {
        this.requestInterceptor = http.interceptors.request.use(
            (config) => {
                console.log(`TokenInterceptor.intercept...[${config.baseURL}${config.url}]`);
                if (!isExcluded(config.url as string, this.excludeUrls) && !config.headers?.Authorization) {
                    config.headers.Authorization = 'Bearer ' + this.getAccessToken();
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.responseInterceptor = http.interceptors.response.use(
            (response) => {
                if (response.status === 200 && response.data.code !== ApiResponse.CODE_SUCCESS) {
                    this.toast(response.data.message);
                }
                return response;
            },
            (error) => {
                if (error.response) {
                    const response = error.response as AxiosResponse;
                    switch (response.status) {
                        case 404:
                            this.toast(
                                {
                                    id: 'api.error.404',
                                    defaultMessage: '{url}接口不存在',
                                },
                                {
                                    url: `${response.status}:${response.config.baseURL}${response.config.url}`,
                                },
                            );
                            break;
                        case 401: {
                            const originalConfig = response.config;
                            if (this.isRefreshing) {
                                return new Promise((resolve) => {
                                    this.requests.push((token: string) => {
                                        originalConfig.headers.Authorization = 'Bearer ' + token;
                                        resolve(http(originalConfig));
                                    });
                                });
                            }
                            this.isRefreshing = true;
                            if (originalConfig.url !== 'oauth/token') {
                                return this.refreshToken()
                                    .then((token) => {
                                        originalConfig.headers.Authorization = 'Bearer ' + token;
                                        this.requests.forEach((resolve) => resolve(token));
                                        this.requests = [];
                                        return http(originalConfig);
                                    })
                                    .catch(() => {
                                        this.toast({
                                            id: 'api.error.401',
                                            defaultMessage: '登录凭证过期,请重新登录!',
                                        });
                                        this.clearToken();
                                        history.push('/login');
                                        return Promise.reject(error);
                                    })
                                    .finally(() => {
                                        this.isRefreshing = false;
                                    });
                            }
                            break;
                        }
                        case 503: {
                            this.toast({
                                id: 'api.error.503',
                                defaultMessage: '请稍后再试',
                            });
                            break;
                        }
                        default:
                            break;
                    }
                } else {
                    if (isTimeoutError(error)) {
                        this.toast({ id: 'api.error.timeout', defaultMessage: '网络连接超时' });
                    } else {
                        this.toast({
                            id: 'api.error',
                            defaultMessage: '网络好像出了点问题,请稍后再试',
                        });
                    }
                }
                return Promise.reject(error);
            },
        );
    }

    destroy() {
        http.interceptors.request.eject(this.requestInterceptor);
        http.interceptors.response.eject(this.responseInterceptor);
    }
}

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
export { axios, get, post, postForm, postJson, postMultiple };
export { postHeaders, postFormHeaders, postJsonHeaders, postMultipartHeaders };
export { cancelAllRequest, cancels, CancelToken };
export { HttpInterceptors };
export type { TokenString, ToastParameters };
