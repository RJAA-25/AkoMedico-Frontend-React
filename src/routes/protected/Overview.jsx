import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOverview } from "../../utilities/eventHandlers/overview";
import Loading from "../../components/state/Loading";

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChanged: user } = useSelector((state) => state.user);
  const { isChanged: profile } = useSelector((state) => state.profile);
  const { isChanged: contact } = useSelector((state) => state.contact);
  const { isChanged: condition } = useSelector((state) => state.condition);
  const { isChanged: doctor } = useSelector((state) => state.doctor);
  const { isChanged: admission } = useSelector((state) => state.admission);
  const { isChanged: consultation } = useSelector(
    (state) => state.consultation
  );

  const [pageLoading, setPageLoading] = useState(true);
  const initialized = [
    user,
    profile,
    contact,
    condition,
    doctor,
    admission,
    consultation,
  ];

  useEffect(() => {
    if (initialized.includes(false)) {
      fetchOverview({ dispatch, navigate, setPageLoading });
    } else setPageLoading(false);
  }, []);

  return (
    <>{pageLoading ? <Loading /> : <div className="grow">Overview</div>}</>
  );
};

export default Overview;
