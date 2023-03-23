import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers/utilities";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (getCookie("CSRF-TOKEN")) navigate("/overview", { replace: true });
    if (getCookie("access_token")) navigate("/overview", { replace: true });
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col">
        <div className="grow flex mx-auto w-full max-w-screen-2xl bg-root bg-cover items-end">
          <div className="w-full bg-base-100 bg-opacity-90">
            <div className="flex flex-col p-10 gap-5">
              <p className="font-bold text-4xl sm:text-5xl">AkoMedico</p>
              <p>
                A lifestyle app that makes access to personal health information
                easy
              </p>
              <div className="flex gap-3">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-neutral">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Root;

// https://www.drawkit.com/product/health-medical-illustrations
// https://www.drawkit.com/product/social-work-charity-illustrations

// https://icons8.com/illustrations/health-care/health
// https://icons8.com/illustrations/health-care
