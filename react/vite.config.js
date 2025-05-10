import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: "/GoWhere/Code/react", // 👈 Add this line
  plugins: [react()],
  server: {
    port: 3000,
  },
})
