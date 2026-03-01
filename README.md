# Status Page

Simple uptime monitor — pings endpoints, shows green/red status dashboard

## Features

- 🚀 Next.js 15 with App Router and TypeScript
- 🎨 Dark theme with responsive design
- 📊 Real-time endpoint monitoring
- ⚡ Auto-refresh every 30 seconds
- 🔧 Configurable endpoints
- 📱 Mobile-first responsive design

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment (optional):**
   ```bash
   cp .env.example .env
   # Edit .env to change PORT if needed (defaults to 4003)
   ```

3. **Configure endpoints:**
   Edit `src/lib/config.ts` to add/modify monitored endpoints:
   ```typescript
   export const endpoints: Endpoint[] = [
     { name: "Google", url: "https://www.google.com", expectedStatus: 200 },
     { name: "GitHub", url: "https://github.com", expectedStatus: 200 },
     // Add more endpoints...
   ];
   ```

## Development

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

The app will be available at http://localhost:4003

## Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## API Endpoints

### GET /api/status

Returns the current status of all configured endpoints.

**Response:**
```json
[
  {
    "name": "Google",
    "url": "https://www.google.com",
    "status": "up",
    "responseTime": 150,
    "checkedAt": "2024-01-01T12:00:00.000Z"
  }
]
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 4003)
- `NEXT_PUBLIC_APP_URL`: Public URL for the application

### Endpoint Configuration

Endpoints are configured in `src/lib/config.ts`:

```typescript
interface Endpoint {
  name: string;        // Display name
  url: string;         // URL to monitor
  expectedStatus: number; // Expected HTTP status code (usually 200)
}
```

## Architecture

- **Frontend**: Next.js 15 App Router with TypeScript
- **Styling**: Tailwind CSS with dark theme
- **API**: Next.js API routes
- **Monitoring**: HTTP fetch with 5-second timeout
- **Refresh**: Client-side polling every 30 seconds

## Design

- **Colors**: Dark theme with green/red status indicators
- **Layout**: Responsive grid (1/2/3 columns)
- **Typography**: Inter font family
- **Components**: Status cards with loading skeletons

## Browser Support

Modern browsers with ES2015+ support. Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT