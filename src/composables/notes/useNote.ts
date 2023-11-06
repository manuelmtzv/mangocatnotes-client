import { mangocatnotesApi } from '@/api/mangocatnotesApi'
import { useQuery } from '@tanstack/vue-query'

interface Params {
  id: string
}

const getNote = async (id: string) => {
  const { data } = await mangocatnotesApi.get(`/notes/${id}`)
  return data
}

const useNote = (params: Params) => {
  const noteQuery = useQuery(['note', params.id], () => getNote(params.id))

  return {
    noteQuery,
  }
}

export default useNote
