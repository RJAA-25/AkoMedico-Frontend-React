import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogout,
  handleResend,
  fetchData,
} from "../../utilities/eventHandlers/confirmation";
import Loading from "../../components/state/Loading";
import Navbar from "../../components/navigation/Navbar";
import imgSrc from "../../assets/images/confirmation.png";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, isChanged: userState } = useSelector(
    (state) => state.user
  );

  const [pageLoading, setPageLoading] = useState(!userState);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (!userState) fetchData({ dispatch, navigate, setPageLoading });
  }, []);

  return (
    <>
      {pageLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex flex-col bg-base-200 bg-layout-pattern">
          <Navbar />
          <div className="grow grid place-content-center mt-16">
            <div className="grid w-full max-w-3xl mx-auto sm:grid-cols-2 gap-5 p-5 text-center">
              <section className="sm:col-span-2 p-5 shadow-lg rounded-lg bg-base-100">
                <h1 className="font-bold text-2xl">
                  Hey, {userData.first_name}
                </h1>
                <div className="max-w-sm mx-auto my-5">
                  <img src={imgSrc} />
                </div>
                <p className="font-bold text-lg my-5">
                  Just making sure it's you!
                </p>
                <div className="my-5">
                  <p>We've sent you an email to verify your account.</p>
                  <p>Once confirmed, you can continue using the application.</p>
                </div>
              </section>
              <section className="rounded-lg shadow-lg p-5 bg-base-100">
                <h2 className="font-bold text-xl">Didn't get any Email?</h2>
                <p className="my-5">
                  Don't worry! We can send you another one.
                </p>
                <button
                  onClick={() =>
                    handleResend({ dispatch, navigate, setLoading })
                  }
                  className={`btn btn-neutral ${
                    loading === "resend" ? "loading" : ""
                  }`}
                >
                  Resend Email
                </button>
              </section>
              <section className="rounded-lg shadow-lg p-5 bg-base-100">
                <h2 className="font-bold text-xl">Not your account?</h2>
                <p className="my-5">
                  Just switch to your account after logging out.
                </p>
                <button
                  onClick={() =>
                    handleLogout({ dispatch, navigate, setLoading })
                  }
                  className={`btn btn-error ${
                    loading === "logout" ? "loading" : ""
                  }`}
                >
                  Log Out
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Confirmation;
