import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { fetchConditions } from "../../../utilities/eventHandlers/conditions";
import Loading from "../../../components/state/Loading";

const ExistingConditions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChanged: conditionState } = useSelector((state) => state.condition);

  const [pageLoading, setPageLoading] = useState(!conditionState);

  useEffect(() => {
    if (!conditionState) {
      fetchConditions({ dispatch, navigate, setPageLoading });
    }
  }, []);

  return pageLoading ? <Loading /> : <Outlet />;
};

export default ExistingConditions;
