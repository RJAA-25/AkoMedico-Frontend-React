import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  handleUpdate,
  handleDelete,
} from "../../../utilities/eventHandlers/contacts";
import { modalActions } from "../../../store/modal";

import ContactForm from "../../../components/form/ContactForm";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contactId } = useParams();
  const contactsData = useSelector((state) => state.contact.data);
  const selected = contactsData.find(
    (contact) => contact.id === Number(contactId)
  );

  const [readOnly, setReadOnly] = useState(true);
  const modal = {
    title: "Delete Emergency Contact",
    body: "Remove emergency contact from your list?",
    action: () =>
      handleDelete({ dispatch, navigate, data: contactsData, id: selected.id }),
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <div className="flex gap-3">
        {readOnly && (
          <>
            <Link to="/emergency-contacts" className="btn grow">
              Back
            </Link>
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
          className={`btn grow ${readOnly ? "btn-secondary" : "btn-error"}`}
          onClick={() => setReadOnly((state) => !state)}
        >
          {readOnly ? "Update" : "Cancel"}
        </button>
      </div>
      {!readOnly && (
        <div className="divider font-bold text-xl sm:text-2xl">
          Update Emergency Contact
        </div>
      )}
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
