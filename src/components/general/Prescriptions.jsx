import { useState } from "react";
import { useSelector } from "react-redux";
import { generateKey } from "../../helpers/utilities";
import {
  handleRemove,
  handleUpload,
} from "../../utilities/eventHandlers/prescriptions";
import PrescriptionForm from "../form/PrescriptionForm";

const Prescriptions = (props) => {
  const { selected, issue, storeAction } = props;

  const source = useSelector((state) => state[issue].data);
  const data = { ...source.find((obj) => obj.uid === selected.uid) };

  const [status, setStatus] = useState("base");

  return (
    <>
      <div className="divider font-bold text-xl sm:text-2xl">
        Prescriptions ({data.prescriptions.length})
      </div>
      <div className="flex justify-between gap-3">
        {status === "base" && (
          <button
            className="btn btn-outline grow"
            onClick={() => setStatus("upload")}
          >
            Add
          </button>
        )}
        {status === "base" && (
          <button
            className="btn btn-outline grow"
            onClick={() => setStatus("remove")}
          >
            Remove
          </button>
        )}
        {status !== "base" && (
          <button
            className="btn grow btn-error"
            onClick={() => setStatus("base")}
          >
            Cancel
          </button>
        )}
      </div>

      {status === "base" && (
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 border place-items-stretch">
          {data.prescriptions.map((img) => (
            <a
              href={img.image_link}
              target="_blank"
              key={generateKey()}
              className="aspect-square bg-base-100 border hover:brightness-150"
            >
              <img
                src={`https://lh3.googleusercontent.com/d/${img.file_id}`}
                // src={img.image_link}
                alt="prescription image"
                className="h-full object-cover"
              />
            </a>
          ))}
        </div>
      )}

      {status === "upload" && (
        <PrescriptionForm
          source={source}
          data={data}
          issue={issue}
          storeAction={storeAction}
          status={{ status, setStatus }}
          handleSubmit={handleUpload}
        />
      )}

      {status === "remove" && (
        <PrescriptionForm
          source={source}
          data={data}
          issue={issue}
          storeAction={storeAction}
          status={{ status, setStatus }}
          handleSubmit={handleRemove}
        />
      )}
    </>
  );
};

export default Prescriptions;
