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

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

/* Marker base */
.game-club-marker {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 5px #00ff9c);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.marker-icon {
  font-size: 24px;
  pointer-events: none;
}

/* Pulse animation */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 156, 0.7);
  }
  70% {
    box-shadow: 0 0 10px 15px rgba(0, 255, 156, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 156, 0);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

/* Active marker style */
.game-club-marker.active {
  transform: scale(1.4);
  filter: drop-shadow(0 0 15px #00ff9c);
  animation: none;
  z-index: 10;
}
</style>
