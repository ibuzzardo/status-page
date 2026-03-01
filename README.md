# Status Page

Simple uptime monitor — pings endpoints, shows green/red status dashboard

## Features

- **Real-time monitoring**: Pings configured HTTP endpoints every 30 seconds
- **Dark theme UI**: Clean, responsive dashboard with status indicators
- **Configurable endpoints**: Easy to add/remove services to monitor
- **Response time tracking**: Shows latency for each service
- **Auto-refresh**: Dashboard updates automatically without page reload
- **Mobile responsive**: Works on desktop, tablet, and mobile devices

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment** (optional):
   ```bash
   cp .env.example .env
   # Edit .env to change PORT if needed (defaults to 4003)
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:4003
   ```

## Configuration

Edit `src/lib/config.ts` to add or modify monitored endpoints:

```typescript
export const endpoints: Endpoint[] = [
  { name: "Google", url: "https://www.google.com", expectedStatus: 200 },
  { name: "GitHub", url: "https://github.com", expectedStatus: 200 },
  { name: "Your API", url: "https://api.yoursite.com/health", expectedStatus: 200 },
];
```

## API Endpoints

### GET /api/status

Returns current status of all configured endpoints:

```json
[
  {
    "name": "Google",
    "url": "https://www.google.com",
    "status": "up",
    "responseTime": 145,
    "checkedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Environment variables**:
   - `PORT`: Server port (default: 4003)

## Development

- **Type checking**: `npm run type-check`
- **Linting**: `npm run lint`
- **Development server**: `npm run dev`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Deployment**: Self-hosted

## License

MIT