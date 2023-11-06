import { watch } from 'vue'
import { mangocatnotesApi } from '@/api/mangocatnotesApi'
import { useQuery } from '@tanstack/vue-query'
import { useNoteStore } from '@/stores/NoteStore'
import { storeToRefs } from 'pinia'
import { INote } from '@/interfaces/INote'
import { ResourcesResponse } from '@/interfaces/auth/ResourcesResponse'

const getNotes = async () => {
  const { data } = await mangocatnotesApi.get<ResourcesResponse<INote>>(
    '/notes'
  )
  return data
}

const useNotes = () => {
  const noteStore = useNoteStore()
  const { notes, sortedByTime } = storeToRefs(noteStore)
  const { data } = useQuery(['notes'], getNotes, {
    enabled: true,
  })

  watch(
    data,
    (value) => {
      if (value?.data) {
        noteStore.setNotes(value?.data)
      }
    },
    {
      immediate: true,
    }
  )

  return {
    notes,
    sortedByTime,
  }
}

export default useNotes
