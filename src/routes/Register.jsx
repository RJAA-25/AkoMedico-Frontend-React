import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helpers/utilities";
import RegisterForm from "../components/form/RegisterForm";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("CSRF-TOKEN")) navigate("/overview", { replace: true });
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col">
        <div className="flex grow mt-16 mx-auto w-full max-w-screen-2xl sm:p-10">
          <div className="flex-1">
            <div className="bg-register w-full h-full bg-cover bg-center"></div>
          </div>
          <div className="bg-primary p-5">
            <RegisterForm />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
