import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Club {
  id: string
  name: string
  description: string
  address: string
  lat: number
  lng: number
  photos: string[]
  rating: number
  reviewCount: number
  isOpen: boolean
  availablePCs?: number
}

export const useClubsStore = defineStore('clubs', () => {
  const clubs = ref<Club[]>([])
  const selectedClub = ref<Club | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function setClubs(data: Club[]) {
    clubs.value = data
  }

  function selectClub(club: Club | null) {
    selectedClub.value = club
  }

  function setLoading(val: boolean) {
    isLoading.value = val
  }

  function setError(msg: string | null) {
    error.value = msg
  }

  return { clubs, selectedClub, isLoading, error, setClubs, selectClub, setLoading, setError }
})
