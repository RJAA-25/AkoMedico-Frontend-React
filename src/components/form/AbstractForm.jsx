import { generateKey } from '../../utilities/keygen';
import { createAbstract } from '../../api/abstract';

const AbstractForm = ({ dispatch, storeAction, index, copy, target }) => {
	const obj = { ...target };
	const abstracts = target.abstracts || 0;
	const imageStyle = {
		// height: '100px',
		width: '18rem',
	};

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#abstract');
		const formData = new FormData(form);
		const res = await createAbstract(formData, target.uid);
		switch (res.status) {
			case 201:
				console.log(res);
				const {
					data: { abstracts: updated },
				} = res;
				obj.abstracts = updated;
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
				id="abstract"
				encType="multipart/form-data"
				onSubmit={handleCreate}
				className="my-5">
				<div className="my-3">
					<label htmlFor="abstract[upload]">Abstract</label>
					<input
						type="file"
						id="abstract[upload]"
						name="abstract[upload][]"
						multiple={true}
						accept="image/*"
						className="form-control"
					/>
				</div>
				<button type="submit" className="btn btn-warning rounded-pill px-5 ">
					Upload
				</button>
			</form>

			<div className="d-flex flex-wrap">
				{abstracts.length > 0 &&
					abstracts.map((abs) => (
						<div className="card mx-1 my-3" key={generateKey()}>
							<img
								src={abs.image_link}
								alt="abstract"
								style={imageStyle}
								className="card-img-top"
							/>
							<div className="card-body text-center">
								<button className="btn btn-warning rounded-pill px-3 mx-2 ">
									View
								</button>
								<a
									href={abs.download_link}
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

export default AbstractForm;
