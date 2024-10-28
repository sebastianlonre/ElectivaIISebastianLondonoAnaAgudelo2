import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { themeGlobalConfig } from './Styles/globalStyles/themeGlobalConfig.js';
import './Styles/globalStyles/globalStyles.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Theme {...themeGlobalConfig} className='niah'>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
