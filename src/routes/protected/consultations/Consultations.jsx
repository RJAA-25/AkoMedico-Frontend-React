import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { fetchConsultations } from "../../../utilities/eventHandlers/consultations";

import imageSrc from "../../../assets/images/consultation.png";
import Banner from "../../../components/general/Banner";
import Loading from "../../../components/state/Loading";

const Consultations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const consultState = useSelector((state) => state.consultation.isChanged);

  const [pageLoading, setPageLoading] = useState(!consultState);

  useEffect(() => {
    if (!consultState)
      fetchConsultations({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <div className="grid gap-5 p-5">
      <Banner title="Consultations" imageSrc={imageSrc} />
      <Outlet />
    </div>
  );
};

export default Consultations;
