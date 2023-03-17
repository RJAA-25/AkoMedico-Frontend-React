import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../../utilities/eventHandlers/doctors";
import imageSrc from "../../../assets/images/doctor.png";
import Banner from "../../../components/general/Banner";
import Loading from "../../../components/state/Loading";

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctorState = useSelector((state) => state.doctor.isChanged);

  const [pageLoading, setPageLoading] = useState(!doctorState);

  useEffect(() => {
    if (!doctorState) {
      fetchDoctors({ dispatch, navigate, setPageLoading });
    }
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <div className="grid gap-5 p-5 mb-20">
      <Banner title="Doctors" imageSrc={imageSrc} />
      <Outlet />
    </div>
  );
};

export default Doctors;
