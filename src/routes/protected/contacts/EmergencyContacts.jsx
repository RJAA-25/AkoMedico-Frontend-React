import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import imageSrc from "../../../assets/images/contact.png";
import { fetchContacts } from "../../../utilities/eventHandlers/contacts";

import Banner from "../../../components/general/Banner";
import Loading from "../../../components/state/Loading";

const EmergencyContacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactState = useSelector((state) => state.contact.isChanged);

  const [pageLoading, setPageLoading] = useState(!contactState);

  useEffect(() => {
    if (!contactState) fetchContacts({ dispatch, navigate, setPageLoading });
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <div className="grid gap-5 p-5 mb-20">
      <Banner title="Emergency Contacts" imageSrc={imageSrc} />
      <Outlet />
    </div>
  );
};

export default EmergencyContacts;
