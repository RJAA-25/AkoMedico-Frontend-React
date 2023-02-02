import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";

import { checkAccess, logoutUser } from "../../api/session";
import { resendConfirmation } from "../../api/confirmation";
import Loading from "../../components/state/Loading";
import { forceLogout } from "../../utilities/functions/global";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, isChanged: userState } = useSelector(
    (state) => state.user
  );
  const { isChanged: profileState } = useSelector((state) => state.profile);

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState("");

  const handleResend = async () => {
    toast.dismiss();
    setLoading("resend");
    const res = await resendConfirmation();
    setLoading("");

    switch (res.status) {
      case 200:
        toast(res.message);
        break;

      case 400:
        toast(res.error);
        break;

      case 401:
        toast.error(res.error);
        forceLogout(dispatch, navigate);
        break;

      default:
        toast.error(res.message);
    }
  };

  const handleLogout = async () => {
    toast.dismiss();
    setLoading("logout");
    const res = await logoutUser();
    setLoading("");

    switch (res.status) {
      case 200:
        toast.success(res.message);
        dispatch(authActions.logout());
        dispatch(userActions.reset());
        dispatch(profileActions.reset());
        navigate("/login", { replace: true });
        break;

      case 400:
        toast(res.error);
        break;

      case 401:
        toast.error(res.error);
        forceLogout(dispatch, navigate);
        break;

      default:
        toast.error(res.message);
    }
  };

  const fetchData = async () => {
    // toast.dismiss();
    const res = await checkAccess();
    setPageLoading(false);

    switch (res.status) {
      case 200:
        const { user, profile } = res;
        dispatch(userActions.set(user));
        dispatch(profileActions.set(profile));
        if (user.email_confirmed) {
          profile
            ? navigate("/overview", { replace: true })
            : navigate("/get-started", { replace: true });
        }
        break;

      case 401:
        toast.error(res.error);
        forceLogout(dispatch, navigate);
        break;

      default:
        toast.error(res.message);
    }
  };

  useEffect(() => {
    if (!userState || !profileState) {
      fetchData();
    } else {
      setPageLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border border-slate-500 h-14">AkoMedico</header>
      <div className="grow grid place-content-center">
        {pageLoading ? (
          <Loading />
        ) : (
          <div className="grid w-full max-w-3xl mx-auto sm:grid-cols-2 gap-5 text-center">
            <section className="border sm:col-span-2 p-5">
              <h1 className="font-bold text-2xl">Hey, {userData.first_name}</h1>
              <div className="italic my-5">Insert Image Here</div>
              <p className="font-bold text-lg my-5">
                Just making sure it's you!
              </p>
              <div className="my-5">
                <p>We've sent you an email to verify your account.</p>
                <p>Once confirmed, you can continue using the application.</p>
              </div>
            </section>
            <section className="border p-5">
              <h2 className="font-bold text-xl">Didn't get any Email?</h2>
              <p className="my-5">Don't worry! We can send you another one.</p>
              <button
                onClick={handleResend}
                className={`btn btn-primary ${
                  loading === "resend" ? "loading" : ""
                }`}
              >
                Resend Email
              </button>
            </section>
            <section className="border p-5">
              <h2 className="font-bold text-xl">Not your account?</h2>
              <p className="my-5">
                Just switch to your account after logging out.
              </p>
              <button
                onClick={handleLogout}
                className={`btn btn-error ${
                  loading === "logout" ? "loading" : ""
                }`}
              >
                Log Out
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
