import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import Loading from "../../../components/state/Loading";
import { fetchContacts } from "../../../utilities/eventHandlers/contacts";

const EmergencyContacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChanged: contactState } = useSelector((state) => state.contact);

  const [pageLoading, setPageLoading] = useState(!contactState);

  useEffect(() => {
    if (!contactState) fetchContacts({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? <Loading /> : <Outlet />;
};

export default EmergencyContacts;
