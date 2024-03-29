import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  handleSubmit,
} from "../../utilities/eventHandlers/getStarted";
import ProfileForm from "../../components/form/ProfileForm";
import Navbar from "../../components/navigation/Navbar";
import Loading from "../../components/state/Loading";

const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { first_name },
    isChanged: userState,
  } = useSelector((state) => state.user);

  const setup = {
    birth_date: "",
    civil_status: "",
    address: "",
    nationality: "",
    contact_number: "",
    height: "",
    weight: "",
    sex: "",
    blood_type: "",
  };

  const [pageLoading, setPageLoading] = useState(!userState);

  useEffect(() => {
    if (!userState) fetchData({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex flex-col mt-16 bg-base-200 bg-layout-pattern">
      <Navbar />
      <div className="grow grid place-content-center gap-5 text-center p-5 bg-base-100 w-full max-w-3xl mx-auto">
        <div className="p-5">
          <h1 className="font-bold text-2xl mb-5">
            Let's build your profile, {first_name}
          </h1>
          <p>
            Fill up the form as accurately as you can. No false entries, please!
          </p>
        </div>
        <ProfileForm setup={setup} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default GetStarted;
