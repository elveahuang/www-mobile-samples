import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import config from './config';

export default defineConfig({
    base: '/app/admin/',
    resolve: {
        alias: {
            '~antd': 'antd',
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    '@primary-color': config.primaryColor,
                },
                javascriptEnabled: true,
            },
        },
    },
    plugins: [reactRefresh(), tsconfigPaths()],
});
