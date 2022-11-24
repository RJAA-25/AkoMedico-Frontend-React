import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getExistingConditions } from '../../../api/request';
import { conditionActions } from '../../../store/condition';
import { fetchAccess } from '../../../utilities/access';

const ExistingConditions = () => {
	console.log('Passed ExistingConditions');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const conditions = useSelector((state) => state.condition.data);
	const conditionState = useSelector((state) => state.condition.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getExistingConditions);
		const { conditions } = res;
		dispatch(conditionActions.set(conditions));
	};

	useEffect(() => {
		if (!conditionState) fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>ExistingConditions</div>;
};

export default ExistingConditions;
