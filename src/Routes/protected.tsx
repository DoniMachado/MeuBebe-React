import { Navigate, Outlet } from "react-router-dom";

const Protected: React.FC = () => {
  const session = localStorage.getItem("session");

  return session ? <Outlet /> : <Navigate to="/signin" />;
};

export default Protected;
