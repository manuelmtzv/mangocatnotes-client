import { watch } from "vue";
import { mangocatnotesApi } from "@/shared/api/mangocatnotesApi";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { INote } from "@/modules/note/interfaces/INote";
import { IPaginateNotes } from "@/modules/note/interfaces/IPaginateNotes";
import { useNotePaginationStore, useNoteStore } from "@/modules/note/stores";
import { MaybeRef, get } from "@vueuse/core";
import { IPaginatedReponse } from "@/shared/interfaces/IPaginatedResponse";

const getNotes = async (
  params?: MaybeRef<IPaginateNotes>,
): Promise<IPaginatedReponse<INote>> => {
  const { data } = await mangocatnotesApi.get<IPaginatedReponse<INote>>(
    "/notes",
    {
      params: get(params),
    },
  );
  return data;
};

const useNotes = () => {
  const noteStore = useNoteStore();
  const { notes, sortedByTime } = storeToRefs(noteStore);

  const paginationStore = useNotePaginationStore();
  const { paginate } = storeToRefs(paginationStore);

  const { data, isLoading, isRefetching, refetch } = useQuery(
    ["notes"],
    () => getNotes(paginate),
    {
      enabled: true,
    },
  );

  watch(
    data,
    (value) => {
      if (value) {
        noteStore.setNotes(value.data);
        paginationStore.setTotalPages(value.meta.totalPages);
      }
      paginationStore.setIsLoading(false);
    },
    {
      immediate: true,
    },
  );

  return {
    notes,
    isLoading,
    isRefetching,
    sortedByTime,

    refetch,
  };
};

export default useNotes;
