import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import imageSrc from "../../../assets/images/condition.png";
import { fetchConditions } from "../../../utilities/eventHandlers/conditions";

import Loading from "../../../components/state/Loading";
import Banner from "../../../components/general/Banner";

const ExistingConditions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conditionState = useSelector((state) => state.condition.isChanged);

  const [pageLoading, setPageLoading] = useState(!conditionState);

  useEffect(() => {
    if (!conditionState) {
      fetchConditions({ dispatch, navigate, setPageLoading });
    }
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <div className="grid gap-5 p-5 mb-20">
      <Banner title="Existing Conditions" imageSrc={imageSrc} />
      <Outlet />
    </div>
  );
};

export default ExistingConditions;
