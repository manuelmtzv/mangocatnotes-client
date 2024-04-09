import { useNotePaginationStore } from "@/stores";
import useNotes from "@/composables/notes/useNotes";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const useNotePagination = () => {
  const { refetch } = useNotes();

  const notePaginationStore = useNotePaginationStore();
  const state = storeToRefs(notePaginationStore);
  const {
    setPaginate,
    setPaginateValue,
    setPage,
    setIsLoading,
    setTotalPages,
  } = notePaginationStore;

  watch(
    () => state.paginate,
    () => {
      refetch();
    },
    {
      deep: true,
    },
  );

  return {
    ...state,

    setPaginate,
    setPaginateValue,
    setPage,
    setIsLoading,
    setTotalPages,
  };
};

export default useNotePagination;
