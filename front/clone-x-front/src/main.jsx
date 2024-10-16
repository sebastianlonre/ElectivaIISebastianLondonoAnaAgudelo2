import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { themeGlobalConfig } from './Styles/globalStyles/themeGlobalConfig.js';
import './Styles/globalStyles/globalStyles.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Theme {...themeGlobalConfig} className='niah'>
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
