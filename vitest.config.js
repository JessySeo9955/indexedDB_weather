import { defineConfig } from 'vite';

export default defineConfig({
    root: '.', // Root directory (where your index.html is)
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        open: true,
        host: 'localhost',
        port: 3000,
    },
    test: {
        environment: 'jsdom',
    },
    // Globally exclude test files from optimization & transforms
    optimizeDeps: {
        // Prevent test-related files from being pre-bundled
        exclude: ['**/tests/**'],
    },
    esbuild: {
        // Fully exclude test files and the tests/ directory
        exclude: /(^|\/)tests\/.*|.*\.(test|spec)\.js$/,
    },
});
