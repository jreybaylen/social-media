import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        clearMocks: true,
        environment: 'jsdom',
        reporters: 'verbose',
        setupFiles: './src/__tests__/config/setup.ts'
    },
    resolve: {
        alias: {
            '@tests': path.resolve(__dirname, 'src/__tests__'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@contianers': path.resolve(__dirname, 'src/contianers'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@theme': path.resolve(__dirname, 'src/theme')
        }
    }
})