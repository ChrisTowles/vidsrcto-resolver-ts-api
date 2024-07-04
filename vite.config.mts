import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**'
    ],
    testTimeout: 1000 * 60 * 2,
    
    
  },
})