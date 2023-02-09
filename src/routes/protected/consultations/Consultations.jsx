import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import Loading from "../../../components/state/Loading";
import { fetchConsultations } from "../../../utilities/eventHandlers/consultations";

const Consultations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChanged: consultState } = useSelector(
    (state) => state.consultation
  );

  const [pageLoading, setPageLoading] = useState(!consultState);

  useEffect(() => {
    if (!consultState)
      fetchConsultations({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? <Loading /> : <Outlet />;
};

export default Consultations;
