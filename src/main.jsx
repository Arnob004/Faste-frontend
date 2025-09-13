import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import BrowserRouter
import './index.css';
import App from './App.jsx';
import HomePage from './Component/Page/homePage.jsx';
import SharePage from './Component/Page/SharePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
