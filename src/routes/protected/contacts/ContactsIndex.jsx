import { useState } from "react";
import { useSelector } from "react-redux";

import { handleCreate } from "../../../utilities/eventHandlers/contacts";

import ContactForm from "../../../components/form/ContactForm";
import ContactsList from "../../../components/list/ContactsList";

const ContactsIndex = () => {
  const contactsData = useSelector((state) => state.contact.data);
  const contacts = [...contactsData].sort((a, b) => {
    if (a.full_name < b.full_name) return -1;
    if (a.full_name > b.full_name) return 1;
    return 0;
  });

  const [create, setCreate] = useState(false);
  const setup = {
    full_name: "",
    relationship: "",
    contact_number: "",
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <button
        className={`btn ${create ? "btn-error" : "btn-neutral"}`}
        onClick={() => setCreate((state) => !state)}
      >
        {create ? "Cancel" : "Add Emergency Contact"}
      </button>
      {create ? (
        <>
          <div className="divider font-bold text-xl sm:text-2xl">
            Add Emergency Contact
          </div>
          <ContactForm
            setup={setup}
            data={contactsData}
            handleSubmit={handleCreate}
          />
        </>
      ) : (
        <ContactsList data={contacts} />
      )}
    </div>
  );
};

export default ContactsIndex;
