const Modal = ({ link, issue, setShowModal }) => {
	return (
		<div
			className="position-absolute vw-100 vh-100 bg-dark"
			onClick={() => setShowModal(false)}>
			<div className="h-75 w-auto">
				<img src={link} alt={issue} className="img-fluid rounded" />
			</div>
		</div>
	);
};

export default Modal;
