import { mangocatnotesApi } from '@/api/mangocatnotesApi'
import { useQuery } from '@tanstack/vue-query'
import { ResourceResponse } from '@/interfaces/auth/ResourceResponse'
import { INote } from '@/interfaces/INote'

interface Params {
  id: string
}

const getNote = async (id: string) => {
  const { data } = await mangocatnotesApi.get<ResourceResponse<INote>>(
    `/notes/${id}`
  )
  return data
}

const useNote = (params: Params) => {
  const noteQuery = useQuery(['note', params.id], () => getNote(params.id))

  return {
    noteQuery,
  }
}

export default useNote
