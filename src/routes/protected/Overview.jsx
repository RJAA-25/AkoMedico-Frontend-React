import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOverview } from "../../utilities/eventHandlers/overview";
import Loading from "../../components/state/Loading";
import ProfileCard from "../../components/card/ProfileCard";
import ConditionCard from "../../components/card/ConditionCard";
import ConsultationCard from "../../components/card/ConsultationCard";
import AdmissionCard from "../../components/card/AdmissionCard";

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile, contact, doctor, condition, consultation, admission } =
    useSelector((state) => state);

  const [pageLoading, setPageLoading] = useState(true);
  const initialized = [
    user.isChanged,
    profile.isChanged,
    contact.isChanged,
    condition.isChanged,
    doctor.isChanged,
    admission.isChanged,
    consultation.isChanged,
  ];

  useEffect(() => {
    if (initialized.includes(false)) {
      fetchOverview({ dispatch, navigate, setPageLoading });
    } else setPageLoading(false);
  }, []);

  return (
    <>
      {pageLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-10 p-5 mb-20">
          <ProfileCard data={{ ...user.data, ...profile.data }} />
          <ConditionCard data={condition.data} />

          <div className="grid sm:grid-cols-2 gap-5">
            <ConsultationCard data={consultation.data} />

            <AdmissionCard data={admission.data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
