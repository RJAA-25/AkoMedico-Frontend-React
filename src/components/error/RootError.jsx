import { useNavigate, useRouteError } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import imgSrc from "/src/assets/images/notfound.png";

const RootError = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col">
        <div className="grow bg-primary bg-layout-pattern flex justify-center items-center p-5">
          <div className="rounded-lg shadow-lg bg-base-100 w-full max-w-3xl p-10 flex flex-col gap-5">
            <p className="font-bold text-center text-2xl">Sorry!</p>
            <img src={imgSrc} className="w-96 aspect-square mx-auto" />
            <p className="font-bold text-center text-xl">
              {error.status} - {error.statusText}
            </p>
            <button
              className="btn"
              onClick={() => navigate(-1, { replace: true })}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RootError;
