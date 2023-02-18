import { useState } from "react";
import { useSelector } from "react-redux";

const ConfirmModal = () => {
  const {
    content: { title, body, action },
  } = useSelector((state) => state.modal);

  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await action();
    setLoading(false);
    setCheck((state) => !state);
  };

  return (
    <>
      <input
        type="checkbox"
        id="confirm-modal"
        checked={check}
        onChange={() => setCheck((state) => !state)}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{body}</p>
          <div className="modal-action">
            <label htmlFor="confirm-modal" className="btn">
              Cancel
            </label>
            <button
              className={`btn ${loading ? "loading" : ""}`}
              onClick={handleClick}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
