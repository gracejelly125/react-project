import { useState, useEffect } from "react";
import useInput from "../hooks/useInput";
import defaultAvatar from "../assets/images/default.png";
import { ProfileFormData } from "../types/types";
import useUserProfileQuery from "../hooks/useUserProfileQuery";
import useUpdateProfileMutation from "../hooks/useUpdateProfileMutation";

const Profile = () => {
  const { data: userProfile, isPending, isError } = useUserProfileQuery();
  const { mutate: updateProfileMutation } = useUpdateProfileMutation();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const newNickname = useInput("");

  useEffect(() => {
    if (userProfile?.avatar && !imagePreview) {
      if (typeof userProfile.avatar === "string") {
        setImagePreview(userProfile.avatar);
      } else if (userProfile.avatar instanceof File) {
        setImagePreview(URL.createObjectURL(userProfile.avatar));
      }
    }
  }, [userProfile?.avatar, imagePreview]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    }
  };

  const handleImageUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const profileFormData: ProfileFormData = {
      avatar: profileImage,
      nickname: newNickname.value,
    };

    updateProfileMutation(profileFormData);
    newNickname.reset();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mx-auto my-5">프로필 수정</h2>

      <form
        className="flex flex-col items-center mb-8"
        onSubmit={handleImageUpdate}
      >
        <label
          htmlFor="profileImage"
          className="flex justify-center items-center w-[150px] h-[150px] rounded-full bg-white cursor-pointer overflow-hidden"
        >
          <img
            src={imagePreview || defaultAvatar}
            alt="프로필 사진"
            className="w-full h-full object-cover"
          />
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </form>

      {isError && (
        <p className="text-red-500 mb-5">프로필 정보를 불러오지 못했습니다.</p>
      )}

      <div className="flex flex-col max-w-sm mx-auto ">
        <form className="common-form" onSubmit={handleImageUpdate}>
          <div className="flex flex-col">
            <label htmlFor="nickname" className="mb-1">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={newNickname.value || userProfile?.nickname || ""}
              placeholder="닉네임"
              onChange={newNickname.handler}
              required
              className="common-input"
              disabled={isPending}
            />
          </div>
          <button
            className="common-btn !px-10 mx-auto w-full"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "업데이트 중..." : "프로필 업데이트"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
