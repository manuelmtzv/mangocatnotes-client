import { useNotePaginationStore } from "@modules/note/stores/notePaginationStore";
import useNotes from "@/modules/note/composables/useNotes";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useToast } from "vue-toast-notification";

const useNotePagination = () => {
  const { data, refetch } = useNotes();
  const toast = useToast();

  const notePaginationStore = useNotePaginationStore();
  const state = storeToRefs(notePaginationStore);
  const {
    setPaginate,
    setPaginateValue,
    setPage,
    setIsLoading,
    setTotalPages,
  } = notePaginationStore;

  async function refetchPagination() {
    setIsLoading(true);
    await refetch();
  }

  watch(
    () => state.paginate,
    async () => {
      await refetchPagination();
    },
    {
      deep: true,
    },
  );

  watch(
    () => data.value?.data,
    (value) => {
      if (!value) return;

      const { paginate, totalPages } = state;

      if (!value.length && paginate.value.page > 1) {
        toast.info("No notes found on last page; redirecting to the last one.");

        setPaginateValue("page", totalPages.value);
      }
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
