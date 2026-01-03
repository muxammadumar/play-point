<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import mapboxgl from 'mapbox-gl'
import { useGameClubsStore } from '@/store/gameClubs'
import { useMapbox } from '@/composables/useMapbox'

// Validate Mapbox token
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN
if (!mapboxToken) {
  throw new Error(
    'VITE_MAPBOX_TOKEN is not set. Please add it to your .env file. ' +
    'Get your token from https://account.mapbox.com/access-tokens/'
  )
}
mapboxgl.accessToken = mapboxToken

/* ------------- STORE ------------- */
const gameClubsStore = useGameClubsStore()
const gameClubs = computed(() => gameClubsStore.clubs)

/* ------------- REFS & MAP ------------- */
const mapContainer = ref<HTMLDivElement | null>(null)

/* ------------- MAP COMPOSABLE ------------- */
const {
  initializeMap,
  addClusteredSource,
  addClusterLayers,
  setupClusterEvents,
  addCustomMarkers,
  animateMarkers
} = useMapbox(mapContainer, gameClubs)

/* ------------- SETUP ------------- */
onMounted(async () => {
  if (!mapContainer.value) return

  try {
    // Fetch game clubs from store
    await gameClubsStore.fetchClubs()

    if (gameClubsStore.error) {
      console.error('Failed to load game clubs:', gameClubsStore.error)
      return
    }

    const map = initializeMap([69.2401, 41.2995], 12)

    map.on('load', () => {
      try {
        addClusteredSource()
        addClusterLayers()
        setupClusterEvents()
        addCustomMarkers()
      } catch (error) {
        console.error('Error setting up map layers:', error)
      }
    })

    map.on('error', (e) => {
      console.error('Map error:', e.error)
    })

    map.on('zoom', animateMarkers)
  } catch (error) {
    console.error('Error initializing map:', error)
  }
})
</script>

<style>
.map-container {
  width: 100%;
  height: 100%;
}

/* Popup */
.mapboxgl-popup-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #00ff9c;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 255, 156, 0.3);
  min-width: 280px;
  color: #ffffff;
}

.mapboxgl-popup-close-button {
  color: #00ff9c;
  font-size: 24px;
  padding: 8px 12px;
  transition: all 0.2s ease;
}

.mapboxgl-popup-close-button:hover {
  color: #00ffff;
  transform: scale(1.1);
}

.mapboxgl-popup-tip {
  border-top-color: #00ff9c;
}

.popup-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  /* border: 2px solid #00ff9c; */
  border-radius: 12px;
  padding: 16px;
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.popup-icon {
  font-size: 28px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 156, 0.5));
}

.popup-title {
  color: #00ff9c;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(0, 255, 156, 0.5);
}

.popup-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff9c, transparent);
  margin-bottom: 12px;
  opacity: 0.5;
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popup-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgba(0, 255, 156, 0.05);
  border-radius: 6px;
  border-left: 3px solid #00ff9c;
}

.popup-label {
  color: #a0a0a0;
  font-size: 13px;
  font-weight: 500;
}

.popup-value {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}
</style>
