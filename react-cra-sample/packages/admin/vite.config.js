import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import config from './config';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const base = env.VITE_BASE_URL ?? '';
    const ourDir = env.VITE_OUT_DIR ?? 'dist';

    console.log(`Current mode - ${mode}`);
    console.log(`Current base - ${base}`);
    console.log(`Current out dit - ${ourDir}`);

    return {
        base: base,
        build: {
            outDir: ourDir,
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
        plugins: [reactRefresh(), tsconfigPaths()],
    };
});
