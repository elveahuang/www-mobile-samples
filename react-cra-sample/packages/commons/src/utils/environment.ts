import { isEqual, isUndefined } from 'lodash';

interface Environment {
    /**
     * 环境名称
     */
    mode: string;
    /**
     * 是否是生产模式
     */
    production: boolean;
    /**
     * 服务器地址
     */
    server: string;
    /**
     * VConsole
     */
    console: {
        enabled: boolean;
    };
}

console.log(process.env);
console.log(process.env.REACT_APP_SERVER);
console.log(process.env.REACT_APP_CONSOLE_ENABLED);

const env: Environment = {
    mode: process.env.NODE_ENV ?? 'development',
    production: isEqual(process.env.NODE_HOME, 'production'),
    server: isUndefined(process.env.REACT_APP_SERVER) ? '' : process.env.REACT_APP_SERVER,
    console: {
        enabled: !!process.env.REACT_APP_CONSOLE_ENABLED,
    },
};

export default env;
