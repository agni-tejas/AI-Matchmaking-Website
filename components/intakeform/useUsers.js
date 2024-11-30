import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useUsers() {
  const {
    isLoading,
    data: rawUsers,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Preprocess users to convert `commonTags` from a comma-separated string to an array
  const users = rawUsers
    ? rawUsers.map((user) => ({
        ...user,
        commonTags: user.commonTags
          ? user.commonTags.split(",").map((tag) => tag.trim()) // Split and trim tags
          : [], // Fallback to an empty array if no commonTags
      }))
    : [];

  return { isLoading, error, users };
}
