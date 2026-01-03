import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GameClub } from '@/types/gameClub'

export const useGameClubsStore = defineStore('gameClubs', () => {
  const clubs = ref<GameClub[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchClubs = async () => {
    loading.value = true
    error.value = null
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      clubs.value = [
        { id: 1, name: 'Cyber Arena', lng: 69.2401, lat: 41.2995, pcs: 60 },
        { id: 2, name: 'Game Zone', lng: 69.2501, lat: 41.3012, pcs: 40 },
        { id: 3, name: 'Play Hub', lng: 69.2455, lat: 41.2980, pcs: 50 }
      ]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch game clubs'
      console.error('Error fetching game clubs:', err)
    } finally {
      loading.value = false
    }
  }

  const getClubById = (id: number): GameClub | undefined => {
    return clubs.value.find(club => club.id === id)
  }

  return {
    clubs,
    loading,
    error,
    fetchClubs,
    getClubById
  }
})


