import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
