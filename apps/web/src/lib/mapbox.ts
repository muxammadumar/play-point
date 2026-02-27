import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export const MAP_DEFAULTS = {
  style: import.meta.env.VITE_MAPBOX_STYLE ?? 'mapbox://styles/mapbox/dark-v11',
  zoom: 13,
  minZoom: 5,
  maxZoom: 18,
} satisfies Partial<mapboxgl.MapOptions>

export default mapboxgl
