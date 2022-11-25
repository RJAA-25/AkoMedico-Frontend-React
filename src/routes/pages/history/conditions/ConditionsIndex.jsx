import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { conditionActions } from '../../../../store/condition';

import ConditionForm from '../../../../components/form/ConditionForm';
import ConditionsList from '../../../../components/list/ConditionsList';

import { createCondition } from '../../../../api/condition';

const ConditionsIndex = () => {
	console.log('Passed ConditionsIndex');
	const [create, setCreate] = useState(false);
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const conditions = useSelector((state) => state.condition.data);
	const conditionState = useSelector((state) => state.condition.isChanged);

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#condition');
		const formData = new FormData(form);
		const res = await createCondition(formData);
		switch (res.status) {
			case 201:
				console.log(res.data.condition);
				const {
					data: { condition },
				} = res;
				dispatch(conditionActions.set([...conditions, condition]));
				setError({});
				setCreate(false);
				navigate(`/existing-conditions/${condition.id}`);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			ConditionsIndex
			{conditionState && (
				<>
					{!create && (
						<>
							<p>Your List of Conditions</p>
							<ConditionsList conditions={conditions} />
							<button onClick={() => setCreate(true)}>Add</button>
						</>
					)}
					{create && (
						<>
							<ConditionForm
								error={error}
								setError={setError}
								handleSubmit={handleCreate}
							/>
							<button
								onClick={() => {
									setError({});
									setCreate(false);
								}}>
								Cancel
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ConditionsIndex;
