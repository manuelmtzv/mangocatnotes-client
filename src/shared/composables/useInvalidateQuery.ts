import { useQueryClient } from "@tanstack/vue-query";

const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  const invalidateQuery = (queryKey: string[]) => {
    queryClient.invalidateQueries(queryKey);
  };

  return {
    invalidateQuery,
  };
};

export default useInvalidateQuery;
