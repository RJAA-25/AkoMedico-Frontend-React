import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../../components/state/Loading";
import { fetchDoctors } from "../../../utilities/eventHandlers/doctors";

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChanged: doctorState } = useSelector((state) => state.doctor);

  const [pageLoading, setPageLoading] = useState(!doctorState);

  useEffect(() => {
    if (!doctorState) {
      fetchDoctors({ dispatch, navigate, setPageLoading });
    }
  }, []);

  return pageLoading ? <Loading /> : <Outlet />;
};

export default Doctors;
