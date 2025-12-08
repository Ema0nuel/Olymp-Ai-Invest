import { defineConfig } from 'vite'
import compression from "vite-plugin-compression";

export default defineConfig({
    plugins: [compression()],
    server: {
        port: 3000,
        open: true,
        hmr: true,
        strictPort: true,
        watch: {
            usePolling: true,
        }
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    build: {
        sourcemap: true,
        outDir: 'dist',
        assetsDir: 'assets',
        copyPublicDir: true,
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    }
})