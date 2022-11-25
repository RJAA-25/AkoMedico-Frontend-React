import { useState } from 'react';
import { generateKey } from '../../utilities/keygen';
import { createPrescription } from '../../api/prescription';

const PrescriptionForm = ({ dispatch, storeAction, index, copy, target, issue }) => {
	const obj = { ...target };
	const prescriptions = target.prescriptions;
	const imageStyle = {
		height: '100px',
		width: 'auto',
	};

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#prescription');
		const formData = new FormData(form);
		const res = await createPrescription(formData, target.uid);
		switch (res.status) {
			case 201:
				console.log(res);
				const {
					data: { prescriptions: updated },
				} = res;
				obj.prescriptions = updated;
				copy.splice(index, 1, obj);
				dispatch(storeAction.set(copy));
				break;
			case 422:
				console.log(res.data.error);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<>
			<form id="prescription" encType="multipart/form-data" onSubmit={handleCreate}>
				<div>
					<input
						type="text"
						name="prescription[issue]"
						hidden={true}
						value={issue}
						readOnly={true}
					/>
				</div>

				<div>
					<input
						type="file"
						name="prescription[upload][]"
						multiple={true}
						accept="image/*"
					/>
				</div>
				<button>Upload</button>
			</form>

			{prescriptions.length > 0 &&
				prescriptions.map((pres) => (
					<div key={generateKey()}>
						<img src={pres.image_link} alt="prescription" style={imageStyle} />
						<button>View</button>
						<button>Select</button>
					</div>
				))}
		</>
	);
};

export default PrescriptionForm;
