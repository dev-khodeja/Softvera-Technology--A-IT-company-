export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Resolves an image path returned by the API (which may be a relative
// /uploads/... path from our own server, or a full external URL) into
// something an <img> tag can use directly.
export const assetUrl = (value) => {
  if (!value) return '';
  const imagePath = String(value).trim().replace(/\\/g, '/');
  if (/^(data:|blob:)/i.test(imagePath)) return imagePath;

  // Production proxies may only pass /api/* to the Node server. Convert both
  // current and legacy upload paths so all database records keep working.
  const uploadPath = imagePath.match(/^(?:https?:\/\/[^/]+)?\/?(?:api\/)?uploads\/(.+)$/i);
  if (uploadPath) return `${API_URL.replace(/\/+$/, '')}/api/uploads/${uploadPath[1]}`;

  // External URLs remain untouched; frontend assets such as /assets/* should
  // be loaded from the frontend origin rather than the API server.
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return imagePath;
};
