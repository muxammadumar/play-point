import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<Set<string>>(new Set())

  const count = computed(() => favoriteIds.value.size)

  function toggle(clubId: string) {
    if (favoriteIds.value.has(clubId)) {
      favoriteIds.value.delete(clubId)
    } else {
      favoriteIds.value.add(clubId)
    }
  }

  function isFavorite(clubId: string) {
    return favoriteIds.value.has(clubId)
  }

  function hydrate(ids: string[]) {
    favoriteIds.value = new Set(ids)
  }

  return { favoriteIds, count, toggle, isFavorite, hydrate }
})
