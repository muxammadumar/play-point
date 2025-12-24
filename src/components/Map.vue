<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

/* ------------ TYPES ------------ */
type GameClub = {
  id: number;
  name: string;
  lng: number;
  lat: number;
  pcs: number;
};

/* ------------ DATA ------------ */
const gameClubs: GameClub[] = [
  { id: 1, name: "Cyber Arena", lng: 69.2401, lat: 41.2995, pcs: 60 },
  { id: 2, name: "Game Zone", lng: 69.2501, lat: 41.3012, pcs: 40 },
  { id: 3, name: "Play Hub", lng: 69.2455, lat: 41.298, pcs: 50 },
  { id: 4, name: "Pixel Palace", lng: 69.2789, lat: 41.3115, pcs: 35 },
  { id: 5, name: "Nexus Gaming", lng: 69.2234, lat: 41.2876, pcs: 45 },
  { id: 6, name: "Victory Lounge", lng: 69.2678, lat: 41.3201, pcs: 55 },
  { id: 7, name: "Epic Games Center", lng: 69.289, lat: 41.2945, pcs: 70 },
  { id: 8, name: "Pro Gamers Club", lng: 69.2156, lat: 41.3089, pcs: 38 },
  { id: 9, name: "Digital Warriors", lng: 69.2567, lat: 41.2867, pcs: 42 },
  { id: 10, name: "Adrenaline Zone", lng: 69.2345, lat: 41.3156, pcs: 48 },
  { id: 11, name: "Quantum Gaming", lng: 69.2923, lat: 41.3034, pcs: 65 },
  { id: 12, name: "Legend Arena", lng: 69.2445, lat: 41.2789, pcs: 52 },
  { id: 13, name: "Thunder Games", lng: 69.2712, lat: 41.3178, pcs: 44 },
  { id: 14, name: "Phoenix Cyber", lng: 69.2189, lat: 41.2934, pcs: 36 },
  { id: 15, name: "Blaze Gaming Hub", lng: 69.2834, lat: 41.2812, pcs: 58 },
  { id: 16, name: "Titan Games", lng: 69.2423, lat: 41.3223, pcs: 47 },
  { id: 17, name: "Storm Arena", lng: 69.2601, lat: 41.2901, pcs: 41 },
  { id: 18, name: "Infinity Club", lng: 69.2756, lat: 41.3145, pcs: 62 },
  { id: 19, name: "Vortex Gaming", lng: 69.2267, lat: 41.2845, pcs: 39 },
  { id: 20, name: "Apex Legends Cafe", lng: 69.289, lat: 41.3067, pcs: 56 },
  { id: 21, name: "Nitro Zone", lng: 69.2378, lat: 41.2967, pcs: 43 },
  { id: 22, name: "Mega Pixels", lng: 69.2645, lat: 41.3189, pcs: 51 },
  { id: 23, name: "Cyber Knights", lng: 69.2512, lat: 41.2823, pcs: 46 },
  { id: 24, name: "Game Masters", lng: 69.2198, lat: 41.3112, pcs: 37 },
  { id: 25, name: "Dragon Gaming", lng: 69.2867, lat: 41.2889, pcs: 64 },
  { id: 26, name: "Velocity Club", lng: 69.2434, lat: 41.3245, pcs: 49 },
  { id: 27, name: "Neon Arena", lng: 69.2723, lat: 41.2934, pcs: 53 },
  { id: 28, name: "Ultra Gaming", lng: 69.2289, lat: 41.2978, pcs: 40 },
  { id: 29, name: "Fusion Games", lng: 69.2578, lat: 41.3134, pcs: 57 },
  { id: 30, name: "Battle Station", lng: 69.2812, lat: 41.2756, pcs: 45 },
  { id: 31, name: "Cosmos Club", lng: 69.2356, lat: 41.3198, pcs: 50 },
  { id: 32, name: "Turbo Gaming", lng: 69.2689, lat: 41.2878, pcs: 42 },
  { id: 33, name: "Elite Players", lng: 69.2167, lat: 41.3056, pcs: 38 },
  { id: 34, name: "Hyperspace Arena", lng: 69.2901, lat: 41.2923, pcs: 66 },
  { id: 35, name: "Pulse Gaming", lng: 69.2445, lat: 41.2734, pcs: 44 },
  { id: 36, name: "Matrix Club", lng: 69.2634, lat: 41.3167, pcs: 54 },
  { id: 37, name: "Savage Gaming", lng: 69.2523, lat: 41.2856, pcs: 48 },
  { id: 38, name: "Warzone Cafe", lng: 69.2234, lat: 41.2912, pcs: 35 },
  { id: 39, name: "Gladiator Arena", lng: 69.2845, lat: 41.3089, pcs: 61 },
  { id: 40, name: "Rush Gaming", lng: 69.2389, lat: 41.3001, pcs: 46 },
  { id: 41, name: "Champion Club", lng: 69.2712, lat: 41.2945, pcs: 52 },
  { id: 42, name: "Stealth Zone", lng: 69.2156, lat: 41.3178, pcs: 39 },
  { id: 43, name: "Odyssey Gaming", lng: 69.2678, lat: 41.2812, pcs: 55 },
  { id: 44, name: "Rapid Fire Club", lng: 69.2467, lat: 41.3223, pcs: 47 },
  { id: 45, name: "Voltage Arena", lng: 69.2589, lat: 41.2889, pcs: 43 },
  { id: 46, name: "Nova Gaming", lng: 69.2823, lat: 41.3145, pcs: 59 },
  { id: 47, name: "Strike Zone", lng: 69.2301, lat: 41.2867, pcs: 41 },
  { id: 48, name: "Phantom Club", lng: 69.2756, lat: 41.3012, pcs: 56 },
  { id: 49, name: "Reactor Gaming", lng: 69.2412, lat: 41.2945, pcs: 49 },
  { id: 50, name: "Summit Arena", lng: 69.2645, lat: 41.3189, pcs: 63 },
];

/* ------------ REFS ------------ */
const mapContainer = ref<HTMLDivElement | null>(null);
let map: MapboxMap | null = null;

const markers = new Map<number, mapboxgl.Marker>();
const activeId = ref<number | null>(null);

let popup: mapboxgl.Popup | null = null;

/* ------------ LIFECYCLE ------------ */
onMounted(() => {
  if (!mapContainer.value) return;

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/dark-v11",
    center: [69.2401, 41.2995],
    zoom: 12,
    attributionControl: false,
  });

  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  // Wait for style to load before adding markers
  map.on("style.load", () => {
    popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: true,
      maxWidth: "300px",
    });

    addMarkers();
  });
});

onBeforeUnmount(() => {
  markers.forEach((m) => m.remove());
  markers.clear();
  popup?.remove();
  map?.remove();
  map = null;
});

/* ------------ FUNCTIONS ------------ */

function addMarkers() {
  if (!map) return;

  gameClubs.forEach((club) => {
    const marker = new mapboxgl.Marker({ color: "#00ff9c" })
      .setLngLat([club.lng, club.lat])
      .addTo(map as MapboxMap);

    marker.getElement().addEventListener("click", (e) => {
      e.stopPropagation();
      setActiveMarker(club.id);
      showPopup(club);
    });

    markers.set(club.id, marker);
  });
}

function setActiveMarker(id: number) {
  activeId.value = id;
  markers.forEach((marker, key) => {
    const element = marker.getElement();
    if (key === id) {
      element.style.filter = "drop-shadow(0 0 10px #00ff9c)";
      element.style.transform = "scale(1.2)";
    } else {
      element.style.filter = "";
      element.style.transform = "";
    }
  });
}

function showPopup(club: GameClub) {
  if (!map || !popup) return;

  popup
    .setLngLat([club.lng, club.lat])
    .setHTML(
      `
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-icon">🎮</div>
          <div class="popup-title">${club.name}</div>
        </div>
        <div class="popup-divider"></div>
        <div class="popup-body">
          <div class="popup-info-row">
            <span class="popup-label">💻 Available PCs:</span>
            <span class="popup-value">${club.pcs}</span>
          </div>
          <div class="popup-info-row">
            <span class="popup-label">📍 Location:</span>
            <span class="popup-value">${club.lat.toFixed(
              4
            )}°N, ${club.lng.toFixed(4)}°E</span>
          </div>
        </div>
      </div>
    `
    )
    .addTo(map);
}
</script>

<style>
.map-container {
  width: 100%;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 100%;
}

/* Popup */
.mapboxgl-popup-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #00ff9c;
  border-radius: 12px;
  padding: 0 !;
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
