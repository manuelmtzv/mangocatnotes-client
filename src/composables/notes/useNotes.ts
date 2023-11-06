import { watch } from 'vue'
import { mangocatnotesApi } from '@/api/mangocatnotesApi'
import { useQuery } from '@tanstack/vue-query'
import { useNoteStore } from '@/stores/NoteStore'
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
  const notesQuery = useQuery(['notes'], getNotes)

  watch(
    () => notesQuery.data,
    (value) => {
      console.log('HI')
      console.log(value.value?.data)

      if (notesQuery.data) {
        noteStore.setNotes(value.value?.data)
      }
    },
    {
      immediate: true,
    }
  )

  return {
    notesQuery,
  }
}

export default useNotes
