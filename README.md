# Play Point

A Vue 3 + TypeScript application for displaying game clubs on an interactive Mapbox map.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Mapbox GL** - Interactive maps
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable Vue components
├── layout/         # Layout components
├── pages/          # Page components
├── router/         # Vue Router configuration
├── services/       # API services
├── store/          # Pinia stores
├── types/           # TypeScript type definitions
└── telegram/        # Telegram WebApp integration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

   Get your Mapbox token from: https://account.mapbox.com/access-tokens/

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview production build:
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file with the following variables:

- `VITE_MAPBOX_TOKEN` (required) - Your Mapbox access token
- `VITE_API_BASE_URL` (optional) - API base URL (default: `http://localhost:3000/api`)
- `VITE_API_TOKEN` (optional) - API authentication token

## Features

- Interactive map with game club locations
- Marker clustering for better performance
- Custom markers with animations
- Popup information on marker click
- Responsive design with Tailwind CSS

## Development

The project uses:
- **Vue 3 Composition API** with `<script setup>` syntax
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** with web history mode

## Notes

### Unused Dependencies

The following dependencies are installed but not currently used in the codebase:
- `@vueuse/core` - Vue composition utilities (can be removed if not needed)
- `lucide-vue-next` - Icon library (can be removed if not needed)

To remove them, run:
```bash
npm uninstall @vueuse/core lucide-vue-next
```

### Environment Variables

Make sure to create a `.env` file with your Mapbox token before running the application. The app will throw an error if the token is missing.

## License

Private project
