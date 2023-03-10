import { Link } from "react-router-dom";
import { generateKey } from "../../helpers/utilities";

const ContactsList = (props) => {
  const { data } = props;

  return (
    <>
      <div className="divider">Emergency Contacts ({data.length})</div>

      {data.length === 0 && (
        <div className="border text-center rounded-lg p-10">
          <p>No emergency contacts added</p>
          {/* <span className="text-sm italic block">(for now, right?)</span>
          <span className="text-xs italic">(...right?)</span> */}
        </div>
      )}

      {data.length > 0 && (
        <ul className="space-y-5">
          {data.map((contact) => (
            <li key={generateKey()}>
              <Link
                to={`/emergency-contacts/${contact.uid}`}
                className="block border p-5 shadow rounded-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between items-baseline">
                  <p>
                    <span className="font-bold">{contact.full_name}</span>
                  </p>
                  <span className="uppercase text-xs tracking-wide">
                    {contact.relationship}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactsList;
