import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { conditionActions } from '../../../../store/condition';

import { destroyCondition, updateCondition } from '../../../../api/condition';
import ConditionForm from '../../../../components/form/ConditionForm';

const ConditionInfo = () => {
	console.log('Passed ConditionInfo');
	const [error, setError] = useState({});
	const [readOnly, setReadOnly] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { conditionId } = useParams();
	const conditions = useSelector((state) => state.condition.data);
	const condition = conditions.find((cond) => cond.id === Number(conditionId));

	const index = conditions.indexOf(condition);
	const copy = [...conditions];

	const handleUpdate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#condition');
		const formData = new FormData(form);
		const res = await updateCondition(formData, condition.id);
		switch (res.status) {
			case 200:
				console.log(res.data.message);
				const {
					data: { condition: updated },
				} = res;
				copy.splice(index, 1, updated);
				dispatch(conditionActions.set(copy));
				setError({});
				setReadOnly(true);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const res = await destroyCondition(condition.id);
		switch (res.status) {
			case 200:
				copy.splice(index, 1);
				dispatch(conditionActions.set(copy));
				console.log('Redirect to ExistingConditions');
				navigate('/existing-conditions', { replace: true });
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			{condition && (
				<>
					<button onClick={() => navigate(-1)}>Back</button>
					{readOnly && <button onClick={() => setReadOnly(false)}>Edit</button>}
					<button onClick={handleDelete}>Delete</button>
					<ConditionForm
						condition={condition}
						readOnly={readOnly}
						setReadOnly={setReadOnly}
						error={error}
						setError={setError}
						update={true}
						handleSubmit={handleUpdate}
					/>
				</>
			)}
		</div>
	);
};

export default ConditionInfo;
