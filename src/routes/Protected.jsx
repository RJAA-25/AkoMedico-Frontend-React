import { Outlet } from "react-router-dom";

const Protected = () => {
  return (
    <div>
      Protected
      <Outlet />
    </div>
  );
};

export default Protected;
