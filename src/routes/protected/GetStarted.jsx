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
  const { data: userData, isChanged: userState } = useSelector(
    (state) => state.user
  );
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow grid place-content-center gap-5 text-center">
        <div className="p-5">
          <h1 className="font-bold text-2xl mb-5">
            Let's build your profile, {userData.first_name}
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
