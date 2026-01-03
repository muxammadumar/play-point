import { ref, onBeforeUnmount, type Ref } from 'vue'
import mapboxgl, {
  Map as MapboxMap,
  GeoJSONSource,
  MapLayerMouseEvent
} from 'mapbox-gl'
import type { FeatureCollection, Point } from 'geojson'
import type { GameClub } from '@/types/gameClub'

export function useMapbox(
  container: Ref<HTMLDivElement | null>,
  gameClubs: Ref<GameClub[]>
) {
  let map: MapboxMap | null = null
  const markers: Map<number, mapboxgl.Marker> = new Map()
  const activeId = ref<number | null>(null)
  let currentPopup: mapboxgl.Popup | null = null

  const initializeMap = (center: [number, number] = [69.2401, 41.2995], zoom = 12) => {
    if (!container.value) {
      throw new Error('Map container is not available')
    }

    map = new mapboxgl.Map({
      container: container.value,
      style: 'mapbox://styles/mapbox/dark-v11',
      center,
      zoom,
      attributionControl: false,
      logoPosition: 'bottom-right'
    })

    return map
  }

  const addClusteredSource = () => {
    if (!map) return

    const geoJson: FeatureCollection<Point> = {
      type: 'FeatureCollection',
      features: gameClubs.value.map((club) => ({
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

  const addClusterLayers = () => {
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

  const setupClusterEvents = () => {
    if (!map) return

    map.on('click', 'clusters', (e: MapLayerMouseEvent) => {
      const features = map!.queryRenderedFeatures(e.point, { layers: ['clusters'] })
      if (!features.length) return

      const feature = features[0]
      const clusterId = feature.properties?.cluster_id
      if (clusterId === undefined) return

      const source = map!.getSource('game-clubs') as GeoJSONSource

      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || zoom == null) return
        
        const geometry = feature.geometry
        if (geometry.type === 'Point') {
          map!.easeTo({
            center: geometry.coordinates as [number, number],
            zoom
          })
        }
      })
    })

    map.on('mouseenter', 'clusters', () => {
      map!.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'clusters', () => {
      map!.getCanvas().style.cursor = ''
    })
  }

  const addCustomMarkers = () => {
    if (!map) return

    // Clean old markers
    markers.forEach((m: mapboxgl.Marker) => m.remove())
    markers.clear()

    gameClubs.value.forEach((club) => {
      const el = document.createElement('div')
      el.className = 'game-club-marker'
      el.title = club.name

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

  const setActiveMarker = (id: number) => {
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

  const showPopup = (club: GameClub) => {
    if (!map) return

    // Remove existing popup if any
    if (currentPopup) {
      currentPopup.remove()
    }

    currentPopup = new mapboxgl.Popup({ offset: 25 })
      .setLngLat([club.lng, club.lat])
      .setHTML(`
        <div style="color:#00ff9c; font-weight:bold;">
          ${club.name}
        </div>
        <div>PCs: ${club.pcs}</div>
      `)
      .addTo(map)
  }

  const animateMarkers = () => {
    if (!map) return
    const zoom = map.getZoom()

    markers.forEach((marker: mapboxgl.Marker) => {
      const el = marker.getElement()
      const scale = 0.7 + (zoom - 10) * 0.1
      el.style.transform = `scale(${Math.min(Math.max(scale, 0.7), 1.3)})`
    })
  }

  const cleanup = () => {
    // Cleanup popup
    if (currentPopup) {
      currentPopup.remove()
      currentPopup = null
    }

    // Cleanup markers
    markers.forEach((m: mapboxgl.Marker) => m.remove())
    markers.clear()

    // Cleanup map
    map?.remove()
    map = null
  }

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    map: () => map,
    initializeMap,
    addClusteredSource,
    addClusterLayers,
    setupClusterEvents,
    addCustomMarkers,
    animateMarkers,
    cleanup
  }
}


