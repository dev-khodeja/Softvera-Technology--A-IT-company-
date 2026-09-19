import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';
import './index.css';
import { SiteSettingsProvider } from './context/SiteSettingsContext';

createRoot(document.getElementById('root')).render(
  <SiteSettingsProvider>
    <RouterProvider router={router} />
  </SiteSettingsProvider>
);
