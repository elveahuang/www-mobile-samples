import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import createImportPlugin from 'vite-plugin-import';
import config from './config';

export default defineConfig({
    base: '/app/',
    build: {
        outDir: 'D:\\Tools\\wnmp\\www\\app\\admin',
    },
    resolve: {
        alias: {
            '~antd': 'antd',
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    '@primary-color': config.primaryColor,
                },
            },
        },
    },
    plugins: [
        reactRefresh(),
        tsconfigPaths(),
        createImportPlugin([
            {
                libraryName: 'antd',
                style: true,
            },
        ]),
    ],
});
