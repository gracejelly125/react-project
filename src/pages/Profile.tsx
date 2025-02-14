import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import useInput from "../hooks/useInput";
import defaultAvatar from "../assets/images/default.png";
import { ProfileFormData } from "../types/types";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [currentNickname, setCurrentNickname] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const newNickname = useInput("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const userProfile = await getUserProfile(token);
        setCurrentNickname(userProfile.nickname);
        setImagePreview(userProfile.avatar);
      } catch (error) {
        console.error("프로필 정보 불러오기 실패:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      const newPreview = URL.createObjectURL(file);
      setImagePreview(newPreview);
    }
  };

  const handleImageUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (profileImage) {
      formData.append("avatar", profileImage);
    }
    if (newNickname.value) {
      formData.append("nickname", newNickname.value);
    }

    const avatarData = formData.get("avatar");
    const profileFormData: ProfileFormData = {
      avatar: avatarData instanceof File ? avatarData : null,
      nickname: (formData.get("nickname") as string) || "",
    };

    try {
      const updateSuccess = await updateProfile(profileFormData);
      if (updateSuccess) {
        alert("프로필 업데이트에 성공했습니다!");
        setImagePreview(updateSuccess.avatar || imagePreview);
        setCurrentNickname(newNickname.value || currentNickname);
        newNickname.reset();
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다!");
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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

      <div className="flex flex-col max-w-sm mx-auto">
        <form className="common-form" onSubmit={handleImageUpdate}>
          <div className="flex flex-col">
            <label htmlFor="nickname" className="mb-1">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={newNickname.value || currentNickname}
              placeholder="닉네임"
              onChange={newNickname.handler}
              required
              className="common-input"
            />
          </div>
          <button className="common-btn !px-10 mx-auto" type="submit">
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
