import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import Loading from "../../../components/state/Loading";
import { fetchAdmissions } from "../../../utilities/eventHandlers/admissions";

const Admissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChanged: admitState } = useSelector((state) => state.admission);

  const [pageLoading, setPageLoading] = useState(!admitState);

  useEffect(() => {
    if (!admitState) fetchAdmissions({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? <Loading /> : <Outlet />;
};

export default Admissions;
