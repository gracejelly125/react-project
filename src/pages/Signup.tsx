import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const userId = useInput("");
  const password = useInput("");
  const nickname = useInput("");
  const navigate = useNavigate();

  const signupHandler = async () => {
    try {
      await register({
        id: userId.value,
        password: password.value,
        nickname: nickname.value,
      });
      alert("회원가입 성공!");
      navigate("/login");
      userId.reset();
      password.reset();
      nickname.reset();
    } catch (error) {
      console.error("error =>", error);
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto">
      <h2 className="text-xl font-bold mx-auto my-5">회원가입</h2>
      <AuthForm
        mode="signup"
        onSubmit={signupHandler}
        userId={userId}
        password={password}
        nickname={nickname}
      />
      <p className="mt-5 mb-2 mx-auto">이미 계정이 있으신가요?</p>
      <Link className="common-btn !px-16 mx-auto" to="/login">
        로그인
      </Link>
    </div>
  );
};

export default Signup;
