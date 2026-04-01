import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 這裡的名稱必須與您在 GitHub 建立的倉庫 (Repository) 名稱完全一致
  base: '/sel-community/', 
})