import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLSData, setLSData, deleteLSData } from '@/lib/utils/helpers/local-storage-helpers'
import { type ILSData } from '@/lib/utils/helpers/local-storage-helpers'
import { LOCAL_STORAGE_KEYS } from '@/lib/utils/local-storage-keys'

const url = 'https://swapi.dev/api/people/'

export const usePeopleStore = defineStore('peopleStore', () => {
  // State
  const people = ref<ILSData[]>([])
  const found = ref<ILSData[]>([])
  const favorites = ref<ILSData[]>([])

  // Actions
  const fetchPeople = async () => {
    const peopleLS = getLSData(LOCAL_STORAGE_KEYS.people)
    if (peopleLS) {
      people.value = peopleLS
      return peopleLS
    }

    try {
      const res = await fetch(url)
      const data = await res.json()
      people.value = (data.results as ILSData[] & [never]) || []
      setLSData(LOCAL_STORAGE_KEYS.people, people.value)
      return people.value
    } catch (e: any) {
      throw new Error(e)
    }
  }

  const searchPeople = async (search: string) => {
    try {
      const res = await fetch(`${url}/?search=${search}`)
      const data = await res.json()
      found.value = data.results
    } catch (e: any) {
      throw new Error(e)
    }
  }

  const setFavorites = (person: ILSData) => {
    const favoriteLS = getLSData(LOCAL_STORAGE_KEYS.favorites)

    if (favoriteLS) {
      favorites.value = favoriteLS
    }

    const foundFavorite = favorites.value.find(
      (item) => item.name.toString() === person.name.toString()
    )

    if (foundFavorite === undefined) {
      favorites.value.push(person)
      deleteLSData(LOCAL_STORAGE_KEYS.favorites)
      setLSData(LOCAL_STORAGE_KEYS.favorites, favorites.value)
    }
  }

  const removeFavorite = (person: ILSData) => {
    const filteredFavorites = favorites.value.filter(
      (item) => item.name.toString() !== person.name.toString()
    )
    favorites.value = filteredFavorites
    deleteLSData(LOCAL_STORAGE_KEYS.favorites)
    if (favorites.value.length) setLSData(LOCAL_STORAGE_KEYS.favorites, filteredFavorites)
  }

  // Getters
  const getPeople = computed(() => people.value)
  const getFound = computed(() => found.value)
  const getFavorites = computed(() => {
    const favoritesLS = getLSData(LOCAL_STORAGE_KEYS.favorites)
    if (favoritesLS) {
      favorites.value = favoritesLS
    }
    return favorites.value
  })

  return {
    people,
    getPeople,
    fetchPeople,
    searchPeople,
    getFound,
    favorites,
    getFavorites,
    setFavorites,
    removeFavorite
  }
})
