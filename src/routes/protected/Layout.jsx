import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import ConfirmModal from "../../components/state/ConfirmModal";

const Layout = () => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <Navbar toggle={{ show: true, check, setCheck }} />
      <div className="drawer drawer-mobile border border-green-500">
        <input
          id="app-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={check}
          onChange={() => setCheck((state) => !state)}
        />

        <div className="drawer-content flex flex-col">
          <div className="grow w-full max-w-screen-lg mx-auto border-2">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="app-drawer"
            className="drawer-overlay border border-red-500"
          ></label>
          <Sidebar toggle={{ setCheck }} />
        </div>
      </div>
      <ConfirmModal />
    </>
  );
};

export default Layout;
