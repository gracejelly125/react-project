export type UserData = {
  id: string;
  password: string;
  nickname?: string;
};

export type ProfileFormData = {
  avatar: File | null;
  nickname: string;
};
