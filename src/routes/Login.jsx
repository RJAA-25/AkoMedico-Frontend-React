import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/form/LoginForm";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { getCookie } from "../helpers/utilities";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("CSRF-TOKEN")) navigate("/overview", { replace: true });
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col">
        <div className="grow flex mt-16 mx-auto w-full max-w-screen-2xl sm:p-10">
          <div className="bg-primary p-5">
            <LoginForm />
          </div>
          <div className="flex-1">
            <div className="bg-login w-full h-full bg-cover bg-center"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
