import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { mangocatnotesApi } from "@/shared/api/mangocatnotesApi";
import { ITag } from "@/modules/tags/interfaces/ITag";

const editTag = async (tag: Partial<ITag>) => {
  const { data } = await mangocatnotesApi.patch<ITag>(`/tags/${tag.id}`, tag);
  return data;
};

export const useTagMutation = () => {
  const queryClient = useQueryClient();

  const editTagMutation = useMutation(editTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
    },
  });

  return {
    editTagMutation,
    editTag: editTagMutation.mutate,
    editTagAsync: editTagMutation.mutateAsync,
  };
};
