import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  handleUpdate,
  handleDelete,
} from "../../../utilities/eventHandlers/contacts";
import { modalActions } from "../../../store/modal";

import ContactForm from "../../../components/form/ContactForm";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contactUid } = useParams();
  const contactsData = useSelector((state) => state.contact.data);
  const selected = contactsData.find((contact) => contact.uid === contactUid);

  const [readOnly, setReadOnly] = useState(true);
  const modal = {
    title: "Delete Emergency Contact",
    body: "Remove emergency contact from your list?",
    action: () =>
      handleDelete({
        dispatch,
        navigate,
        data: contactsData,
        uid: selected.uid,
      }),
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <div className="flex gap-3">
        {readOnly && (
          <>
            <button
              className="btn btn-accent grow"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <label
              htmlFor="confirm-modal"
              onClick={() => dispatch(modalActions.set(modal))}
              className="grow btn btn-error"
            >
              Delete
            </label>
          </>
        )}
        <button
          className={`btn grow ${readOnly ? "btn-neutral" : "btn-error"}`}
          onClick={() => setReadOnly((state) => !state)}
        >
          {readOnly ? "Update" : "Cancel"}
        </button>
      </div>
      <div className="divider font-bold text-xl sm:text-2xl">
        {readOnly ? "Contact Details" : "Update Contact"}
      </div>
      <ContactForm
        setup={selected}
        data={contactsData}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        handleSubmit={handleUpdate}
      />
    </div>
  );
};

export default ContactInfo;
