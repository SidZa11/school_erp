import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ConfigProvider } from 'antd'
import { CustomeTheme } from './CustomTheme.ts'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{...CustomeTheme}}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
)
