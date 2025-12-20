<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import mapboxgl, {
  Map as MapboxMap,
  GeoJSONSource,
  MapLayerMouseEvent
} from 'mapbox-gl'
import type { FeatureCollection, Point } from 'geojson'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

/* ------------- TYPES ------------- */
type GameClub = {
  id: number
  name: string
  lng: number
  lat: number
  pcs: number
}

/* ------------- DATA ------------- */
const gameClubs: GameClub[] = [
  { id: 1, name: 'Cyber Arena', lng: 69.2401, lat: 41.2995, pcs: 60 },
  { id: 2, name: 'Game Zone', lng: 69.2501, lat: 41.3012, pcs: 40 },
  { id: 3, name: 'Play Hub', lng: 69.2455, lat: 41.2980, pcs: 50 }
]

/* ------------- REFS & MAP ------------- */
const mapContainer = ref<HTMLDivElement | null>(null)
let map: MapboxMap | null = null

// Use JS native Map for markers keyed by club id
const markers: Map<number, mapboxgl.Marker> = new Map()

// Active marker id reactive
const activeId = ref<number | null>(null)

/* ------------- SETUP ------------- */
onMounted(() => {
  if (!mapContainer.value) return

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [69.2401, 41.2995],
    zoom: 12,
    attributionControl: false,
    logoPosition: 'bottom-right'
  })

  // map.addControl(
  //   new mapboxgl.AttributionControl({ compact: true }),
  //   'bottom-right'
  // )
  // map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

  map.on('load', () => {
    addClusteredSource()
    addClusterLayers()
    setupClusterEvents()
    addCustomMarkers()
  })

  map.on('zoom', animateMarkers)
})

onBeforeUnmount(() => {
  markers.forEach((m: mapboxgl.Marker) => m.remove())
  markers.clear()
  map?.remove()
  map = null
})

/* ------------- FUNCTIONS ------------- */

function addClusteredSource() {
  if (!map) return

  const geoJson: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: gameClubs.map((club) => ({
      type: 'Feature',
      properties: {
        id: club.id,
        name: club.name,
        pcs: club.pcs
      },
      geometry: {
        type: 'Point',
        coordinates: [club.lng, club.lat]
      }
    }))
  }

  map.addSource('game-clubs', {
    type: 'geojson',
    data: geoJson,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50
  })
}

function addClusterLayers() {
  if (!map) return

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'game-clubs',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#00ff9c',
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        18, 10,
        24, 30,
        30
      ],
      'circle-opacity': 0.85
    }
  })

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'game-clubs',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    },
    paint: {
      'text-color': '#000'
    }
  })
}

function setupClusterEvents() {
  if (!map) return

  map.on('click', 'clusters', (e: MapLayerMouseEvent) => {
    const features = map!.queryRenderedFeatures(e.point, { layers: ['clusters'] })
    const clusterId = features[0].properties?.cluster_id
    const source = map!.getSource('game-clubs') as GeoJSONSource

    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || zoom == null) return
      map!.easeTo({
        center: (features[0].geometry as any).coordinates,
        zoom
      })
    })
  })

  map.on('mouseenter', 'clusters', () => {
    map!.getCanvas().style.cursor = 'pointer'
  })
  map.on('mouseleave', 'clusters', () => {
    map!.getCanvas().style.cursor = ''
  })
}

function addCustomMarkers() {
  if (!map) return

  // Clean old markers
  markers.forEach((m: mapboxgl.Marker) => m.remove())
  markers.clear()

  gameClubs.forEach((club) => {
    const el = document.createElement('div')
    el.className = 'game-club-marker'
    el.title = club.name

    // Icon element, e.g., emoji or SVG
    const icon = document.createElement('div')
    icon.className = 'marker-icon'
    icon.innerHTML = '🎮'
    el.appendChild(icon)

    el.classList.add('pulse-animation')

    if (activeId.value === club.id) {
      el.classList.add('active')
    }

    el.addEventListener('click', () => {
      setActiveMarker(club.id)
      showPopup(club)
    })

    const marker = new mapboxgl.Marker(el)
      .setLngLat([club.lng, club.lat])
      .addTo(map!)

    markers.set(club.id, marker)
  })
}

function setActiveMarker(id: number) {
  activeId.value = id
  markers.forEach((marker, key) => {
    const el = marker.getElement()
    if (key === id) {
      el.classList.add('active')
    } else {
      el.classList.remove('active')
    }
  })
}

function showPopup(club: GameClub) {
  if (!map) return

  new mapboxgl.Popup({ offset: 25 })
    .setLngLat([club.lng, club.lat])
    .setHTML(`
      <div style="color:#00ff9c; font-weight:bold;">
        ${club.name}
      </div>
      <div>PCs: ${club.pcs}</div>
    `)
    .addTo(map)
}

function animateMarkers() {
  if (!map) return
  const zoom = map.getZoom()

  markers.forEach((marker: mapboxgl.Marker) => {
    const el = marker.getElement()
    const scale = 0.7 + (zoom - 10) * 0.1
    el.style.transform = `scale(${Math.min(Math.max(scale, 0.7), 1.3)})`
  })
}
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
