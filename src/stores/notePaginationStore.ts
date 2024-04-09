import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  IPaginateNotes,
  type PaginateNotesKeys,
} from "@/interfaces/note/IPaginateNotes";

type SetPageType = "prev" | "next";

export const useNotePaginationStore = defineStore("notePaginationStore", () => {
  const paginate = ref<IPaginateNotes>({
    page: 1,
    limit: 12,
  });
  const totalPages = ref(1);
  const isLoading = ref(false);

  const paginateRestrictions = computed(() => ({
    canGoPrev: paginate.value.page > 1,
    canGoNext: paginate.value.page < totalPages.value,
  }));

  return {
    paginate,
    isLoading,
    totalPages,
    paginateRestrictions,

    setPaginateValue<K extends PaginateNotesKeys>(
      key: K,
      value: IPaginateNotes[K],
    ): void {
      paginate.value[key] = value;
    },
    setPaginate(newPaginate: IPaginateNotes): void {
      paginate.value = newPaginate;
    },
    setPage(type: SetPageType): void {
      if (isLoading.value) return;

      const { canGoPrev, canGoNext } = paginateRestrictions.value;

      if (type === "prev") {
        if (canGoPrev) paginate.value.page -= 1;
      } else {
        if (canGoNext) paginate.value.page += 1;
      }
    },
    setIsLoading(value: boolean): void {
      isLoading.value = value;
    },
    setTotalPages(value: number): void {
      totalPages.value = value;
    },
  };
});
