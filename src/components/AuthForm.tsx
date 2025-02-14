type InputFieldProps = {
  value: string;
  handler: React.ChangeEventHandler<HTMLInputElement>;
};

type AuthFormProps = {
  mode: string;
  onSubmit: (userId: string, password: string, nickname?: string) => void;
  userId: InputFieldProps;
  password: InputFieldProps;
  nickname?: InputFieldProps;
};

const AuthForm = ({
  mode,
  onSubmit,
  userId,
  password,
  nickname,
}: AuthFormProps) => {
  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit(userId.value, password.value);
    } else {
      onSubmit(userId.value, password.value, nickname?.value);
    }
  };

  return (
    <>
      <form
        className="common-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={userId.value}
          placeholder="아이디"
          onChange={userId.handler}
          required
          className="w-full common-input"
        />
        <input
          type="password"
          value={password.value}
          placeholder="비밀번호"
          onChange={password.handler}
          required
          className="w-full common-input"
        />
        {isLogin ? (
          <button
            type="submit"
            className="w-full common-btn"
          >
            로그인
          </button>
        ) : (
          <>
            <input
              type="text"
              value={nickname?.value}
              placeholder="닉네임"
              onChange={nickname?.handler}
              required
              className="w-full common-input"
            />
            <button
              type="submit"
              className="w-full common-btn"
            >
              회원가입
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default AuthForm;
