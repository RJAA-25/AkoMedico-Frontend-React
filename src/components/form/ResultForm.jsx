import { useState } from 'react';
import { generateKey } from '../../utilities/keygen';
import { createResult } from '../../api/result';

const ResultForm = ({ dispatch, storeAction, index, copy, target, issue }) => {
	const obj = { ...target };
	const results = target.results;
	const imageStyle = {
		height: '100px',
		width: 'auto',
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
				<div>
					<input
						type="text"
						name="result[issue]"
						hidden={true}
						value={issue}
						readOnly={true}
					/>
				</div>

				<div>
					<input type="file" name="result[upload][]" multiple={true} accept="image/*" />
				</div>
				<button>Upload</button>
			</form>

			{results.length > 0 &&
				results.map((res) => (
					<div key={generateKey()}>
						<img src={res.image_link} alt="result" style={imageStyle} />
						<button>View</button>
						<button>Select</button>
					</div>
				))}
		</>
	);
};

export default ResultForm;
