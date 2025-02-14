import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useInput from "../hooks/useInput";
import { login } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const userId = useInput("");
  const password = useInput("");
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const loginHandler = async () => {
    try {
      const data = await login({
        id: userId.value,
        password: password.value,
      });
      alert("로그인 성공!");
      setToken(data.accessToken, data.userId);
      navigate("/");
      userId.reset();
      password.reset();
    } catch (error) {
      console.error("error =>", error);
      alert("로그인 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto">
      <h2 className="text-xl font-bold mx-auto my-5">로그인</h2>
      <AuthForm
        mode="login"
        onSubmit={loginHandler}
        userId={userId}
        password={password}
      />
      <p className="mt-5 mb-2 mx-auto">계정이 없으신가요?</p>
      <Link className="common-btn !px-10 mx-auto" to="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default Login;
