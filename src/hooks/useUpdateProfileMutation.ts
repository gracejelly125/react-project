import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/auth";
import { ProfileFormData } from "../types/types";

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, ProfileFormData>({
    mutationFn: async (profileFormData: ProfileFormData) => {
      return await updateProfile(profileFormData);
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["userProfile"], updatedProfile);
      alert("프로필 업데이트에 성공했습니다!");
    },
    onError: (error) => {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다!");
    },
  });
};

export default useUpdateProfileMutation;
