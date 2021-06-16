import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const base = env.VITE_BASE_URL ?? '';
    const out = env.VITE_OUT_DIR ?? 'dist';

    console.log(`Current mode - ${mode}`);
    console.log(`Current base - ${base}`);
    console.log(`Current out - ${out}`);

    return {
        base: base,
        build: {
            outDir: out,
        },
        resolve: {
            alias: {
                '~antd': 'antd',
                '~braft-editor': 'braft-editor',
                '~video.js': 'video.js',
                '~styles': path.join(__dirname, '../commons/src/styles'),
            },
        },
        plugins: [reactRefresh(), tsconfigPaths()],
    };
});
