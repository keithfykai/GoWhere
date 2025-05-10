import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import ghPages from 'vite-plugin-gh-pages';

export default defineConfig({
  base: '/GoWhere/', // 👈 Your repo name with slashes
  plugins: [react(), ghPages()],
  server: {
    port: 3000,
  },
});
