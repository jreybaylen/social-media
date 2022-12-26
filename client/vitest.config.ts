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
            '@pages': path.resolve(__dirname, 'src/pages')
        }
    }
})