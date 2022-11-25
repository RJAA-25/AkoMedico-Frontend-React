import { useState } from 'react';
import { generateKey } from '../../utilities/keygen';
import { createAbstract } from '../../api/abstract';

const AbstractForm = ({ dispatch, storeAction, index, copy, target }) => {
	const obj = { ...target };
	const abstracts = target.abstracts;
	const imageStyle = {
		height: '100px',
		width: 'auto',
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
			<form id="abstract" encType="multipart/form-data" onSubmit={handleCreate}>
				<div>
					<input type="file" name="abstract[upload][]" multiple={true} accept="image/*" />
				</div>
				<button>Upload</button>
			</form>

			{abstracts.length > 0 &&
				abstracts.map((abs) => (
					<div key={generateKey()}>
						<img src={abs.image_link} alt="abstract" style={imageStyle} />
						<button>View</button>
						<button>Select</button>
					</div>
				))}
		</>
	);
};

export default AbstractForm;
