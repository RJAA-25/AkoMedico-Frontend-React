import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/state/Loading";
import { fetchProfile } from "../../utilities/eventHandlers/profile";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profileData, isChanged: profileState } = useSelector(
    (state) => state.profile
  );

  const [pageLoading, setPageLoading] = useState(!profileState);

  useEffect(() => {
    if (!profileState) fetchProfile({ dispatch, navigate, setPageLoading });
  }, []);

  return <>{pageLoading ? <Loading /> : <div>Profile</div>}</>;
};

export default Profile;
