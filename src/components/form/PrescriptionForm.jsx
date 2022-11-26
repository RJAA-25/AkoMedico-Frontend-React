import { generateKey } from '../../utilities/keygen';
import { createPrescription } from '../../api/prescription';

const PrescriptionForm = ({ dispatch, storeAction, index, copy, target, issue }) => {
	const obj = { ...target };
	const prescriptions = target.prescriptions;
	const imageStyle = {
		// height: '100px',
		width: '18rem',
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
			<form
				id="prescription"
				encType="multipart/form-data"
				onSubmit={handleCreate}
				className="my-5">
				<div className="my-3">
					<label htmlFor="prescription[upload]" className="form-label fw-semibold">
						Prescriptions
					</label>
					<input
						id="prescription[upload]"
						type="file"
						name="prescription[upload][]"
						multiple={true}
						accept="image/*"
						className="form-control"
					/>
				</div>

				<div className="my-3">
					<input
						type="text"
						name="prescription[issue]"
						hidden={true}
						value={issue}
						readOnly={true}
					/>
				</div>

				<button type="submit" className="btn btn-warning rounded-pill px-5 ">
					Upload
				</button>
			</form>

			<div className="d-flex flex-wrap">
				{prescriptions.length > 0 &&
					prescriptions.map((pres) => (
						<div className="card mx-1 my-3" key={generateKey()}>
							<img
								src={pres.image_link}
								alt="prescription"
								style={imageStyle}
								className="card-img-top"
							/>
							<div className="card-body text-center">
								<button className="btn btn-warning rounded-pill px-3 mx-2 ">
									View
								</button>
								<a
									href={pres.download_link}
									className="btn btn-warning rounded-pill px-3 mx-2">
									Download
								</a>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default PrescriptionForm;
