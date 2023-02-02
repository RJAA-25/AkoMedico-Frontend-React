import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const authorized = useSelector((state) => state.auth.isAuthenticated);

  return <>{authorized ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default Protected;
