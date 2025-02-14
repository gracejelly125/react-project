import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const { isAuthenticated, removeToken } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto p-4 border-b">
      <nav className="flex justify-between">
        <ul>
          <li>
            <Link className="py-1 px-4 rounded-lg" to="/">
              홈
            </Link>
          </li>
        </ul>
        <ul className="flex gap-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link className="common-btn" to="/profile">
                  마이페이지
                </Link>
              </li>
              <li>
                <button
                  className="common-btn"
                  onClick={() => {
                    removeToken();
                  }}
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="common-btn" to="/login">
                  로그인
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
