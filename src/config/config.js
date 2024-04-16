const { VITE_API_URL } = import.meta.env;

const config = Object.freeze({
  apiUrl: String(VITE_API_URL),
});

export default config;