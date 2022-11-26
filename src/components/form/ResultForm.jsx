import { generateKey } from '../../utilities/keygen';
import { createResult } from '../../api/result';

const ResultForm = ({ dispatch, storeAction, index, copy, target, issue }) => {
	const obj = { ...target };
	const results = target.results;
	const imageStyle = {
		// height: '100px',
		width: '18rem',
	};

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#result');
		const formData = new FormData(form);
		const res = await createResult(formData, target.uid);
		switch (res.status) {
			case 201:
				console.log(res);
				const {
					data: { results: updated },
				} = res;
				obj.results = updated;
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
			<form id="result" encType="multipart/form-data" onSubmit={handleCreate}>
				<div className="my-3">
					<label htmlFor="result[upload]" className="form-label fw-semibold">
						Results
					</label>
					<input
						type="file"
						id="result[upload]"
						name="result[upload][]"
						multiple={true}
						accept="image/*"
						className="form-control"
					/>
				</div>
				<div className="my-3">
					<input
						type="text"
						name="result[issue]"
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
				{results.length > 0 &&
					results.map((res) => (
						<div className="card mx-1 my-3" key={generateKey()}>
							<img
								src={res.image_link}
								alt="result"
								style={imageStyle}
								className="card-img-top"
							/>
							<div className="card-body text-center">
								<button className="btn btn-warning rounded-pill px-3 mx-2 ">
									View
								</button>
								<a
									href={res.download_link}
									className="btn btn-warning rounded-pill px-3 mx-2 ">
									Download
								</a>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default ResultForm;
