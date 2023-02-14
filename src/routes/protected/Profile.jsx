import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchProfile,
  handleUpdate,
} from "../../utilities/eventHandlers/profile";
import imageSrc from "../../assets/images/profile.png";

import Loading from "../../components/state/Loading";
import Banner from "../../components/general/Banner";
import ProfileForm from "../../components/form/ProfileForm";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: userData, isChanged: profileState } = useSelector(
    (state) => state.profile
  );

  const [pageLoading, setPageLoading] = useState(!profileState);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    if (!profileState) fetchProfile({ dispatch, navigate, setPageLoading });
  }, []);

  return (
    <>
      {pageLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-10 border-2 p-5">
          <Banner title="Profile" imageSrc={imageSrc} />
          <button
            className={`btn btn-block max-w-3xl mx-auto ${
              readOnly ? "btn-neutral" : "btn-error"
            }`}
            onClick={() => setReadOnly((state) => !state)}
          >
            {readOnly ? "Update Profile" : "Cancel Update"}
          </button>
          <ProfileForm
            setup={userData}
            toggle={{ readOnly, setReadOnly }}
            handleSubmit={handleUpdate}
            dispatch={dispatch}
            navigate={navigate}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
