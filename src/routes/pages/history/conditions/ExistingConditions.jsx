import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { conditionActions } from '../../../../store/condition';

import { fetchAccess } from '../../../../utilities/access';
import { getExistingConditions } from '../../../../api/request';

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

	return (
		<div>
			ExistingConditions
			<Outlet />
		</div>
	);
};

export default ExistingConditions;
