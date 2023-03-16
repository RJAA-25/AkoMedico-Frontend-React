import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { fetchAdmissions } from "../../../utilities/eventHandlers/admissions";

import imageSrc from "../../../assets/images/admission.png";
import Banner from "../../../components/general/Banner";
import Loading from "../../../components/state/Loading";

const Admissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admitState = useSelector((state) => state.admission.isChanged);

  const [pageLoading, setPageLoading] = useState(!admitState);

  useEffect(() => {
    if (!admitState) fetchAdmissions({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <div className="grid gap-5 p-5 mb-20">
      <Banner title="Admissions" imageSrc={imageSrc} />
      <Outlet />
    </div>
  );
};

export default Admissions;
