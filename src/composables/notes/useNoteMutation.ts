import { mangocatnotesApi } from '@/api/mangocatnotesApi'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { INote } from '@/interfaces/INote'
import { ResourceResponse } from '@/interfaces/auth/ResourceResponse'

const createNote = async (note: Pick<INote, 'title' | 'content'>) => {
  const { data } = await mangocatnotesApi.post<ResourceResponse<INote>>(
    '/notes',
    note
  )
  return data
}

const editNote = async (note: Partial<INote>) => {
  const { data } = await mangocatnotesApi.put(`/notes/${note.id}`, note)
  return data
}

const deleteNote = async (id: string) => {
  const { data } = await mangocatnotesApi.delete(`/notes/${id}`)
  return data
}

const useNoteMutation = () => {
  const queryClient = useQueryClient()

  const createNoteMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })

  const editNoteMutation = useMutation(editNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })

  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })

  return {
    createNoteMutation,
    createNote: createNoteMutation.mutate,
    createNoteAsync: createNoteMutation.mutateAsync,

    editNoteMutation,
    editNote: editNoteMutation.mutate,
    editNoteAsync: editNoteMutation.mutateAsync,

    deleteNoteMutation,
    deleteNote: deleteNoteMutation.mutate,
    deleteNoteAsync: deleteNoteMutation.mutateAsync,
  }
}

export default useNoteMutation
