import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";

const Layout = () => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <Navbar toggle={{ show: true, check, setCheck }} />
      <div className="drawer drawer-mobile container mx-auto border border-green-500">
        <input
          id="app-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={check}
          onChange={() => setCheck((state) => !state)}
        />

        <div className="drawer-content flex flex-col">
          <Outlet />
        </div>

        <div className="drawer-side">
          <label
            htmlFor="app-drawer"
            className="drawer-overlay border border-red-500"
          ></label>
          <Sidebar toggle={{ setCheck }} />
        </div>
      </div>
    </>
  );
};

export default Layout;
