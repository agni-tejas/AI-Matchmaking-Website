import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../services/apiUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUserMutation, isLoading: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loggeduser"] });
    },
  });

  return { isCreating, createUserMutation };
}
