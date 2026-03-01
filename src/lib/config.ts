import { Endpoint } from './types';

export const endpoints: Endpoint[] = [
  { name: "Google", url: "https://www.google.com", expectedStatus: 200 },
  { name: "GitHub", url: "https://github.com", expectedStatus: 200 },
  { name: "Cloudflare", url: "https://1.1.1.1", expectedStatus: 200 },
];