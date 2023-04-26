import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  store: () => ({
    notes: [],
  }),
  getters: {},
  actions: {},
})
