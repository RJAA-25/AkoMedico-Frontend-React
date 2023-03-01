import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateKey, getFormData } from "../../helpers/utilities";

const PrescriptionForm = (props) => {
  const {
    source,
    data,
    issue,
    storeAction,
    status: { status, setStatus },
    handleSubmit,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <form
      id="prescription"
      encType="multipart/form-data"
      className="grid gap-5"
      onSubmit={(e) => {
        // e.preventDefault();
        // getFormData("#prescription");
        handleSubmit(e, {
          dispatch,
          navigate,
          storeAction,
          setStatus,
          setLoading,
          source,
          data,
        });
      }}
    >
      <input
        type="text"
        name="prescription[issue]"
        defaultValue={issue}
        hidden={true}
      />

      {status === "upload" && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select files to be uploaded</span>
          </label>
          <input
            type="file"
            name="prescription[upload][]"
            multiple={true}
            accept="image/*"
            className="file-input w-full input-bordered"
          />
        </div>
      )}

      {status === "remove" && (
        <>
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 place-items-stretch">
            <label className="label col-span-2 sm:col-span-3">
              <span className="label-text">Select files to be removed</span>
            </label>

            {data.prescriptions.map((img) => (
              <div
                key={generateKey()}
                className="aspect-square bg-base-100 border"
              >
                <input
                  type="checkbox"
                  name="prescription[remove][]"
                  id={img.file_id}
                  value={img.file_id}
                  hidden={true}
                  className="peer"
                />
                <label
                  htmlFor={img.file_id}
                  className="block h-full hover:cursor-pointer peer-checked:border-4 peer-checked:border-red-500"
                >
                  <img
                    src={`https://lh3.googleusercontent.com/d/${img.file_id}`}
                    // src={img.image_link}
                    alt="prescription image"
                    className="h-full object-cover"
                  />
                </label>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        type="submit"
        className={`btn btn-outline ${loading ? "loading" : ""}`}
      >
        {status === "upload" ? "Upload Files" : "Remove Files"}
      </button>
    </form>
  );
};

export default PrescriptionForm;