import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth";
import { ProfileFormData } from "../types/types";

const useUserProfileQuery = () => {
  return useQuery<ProfileFormData, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token");
      return await getUserProfile(token);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useUserProfileQuery;
