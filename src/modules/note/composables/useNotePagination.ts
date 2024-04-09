import { useNotePaginationStore } from "@modules/note/stores/notePaginationStore";
import useNotes from "@/modules/note/composables/useNotes";
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
