import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateKey } from "../../helpers/utilities";
import { modalActions } from "../../store/modal";

const ResultForm = (props) => {
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
  const modal = {
    title: "Remove Results",
    body: "Remove selected results from your list?",
    action: (e) =>
      handleSubmit(e, {
        dispatch,
        navigate,
        storeAction,
        setStatus,
        source,
        data,
      }),
  };

  return (
    <form
      id="result"
      encType="multipart/form-data"
      className="grid gap-5"
      onSubmit={(e) =>
        handleSubmit(e, {
          dispatch,
          navigate,
          storeAction,
          setStatus,
          setLoading,
          source,
          data,
        })
      }
    >
      <input
        type="text"
        name="result[issue]"
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
            name="result[upload][]"
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

            {data.results.map((img) => (
              <div
                key={generateKey()}
                className="aspect-square bg-base-100 border"
              >
                <input
                  type="checkbox"
                  name="result[remove][]"
                  id={img.uid}
                  value={img.uid}
                  hidden={true}
                  className="peer"
                />
                <label
                  htmlFor={img.uid}
                  className="block h-full hover:cursor-pointer peer-checked:border-4 peer-checked:border-red-500"
                >
                  <img
                    src={img.image_url}
                    alt="prescription image"
                    className="h-full object-cover"
                  />
                </label>
              </div>
            ))}
          </div>
        </>
      )}

      {status === "upload" && (
        <button
          type="submit"
          className={`btn btn-neutral ${loading ? "loading" : ""}`}
        >
          Upload Files
        </button>
      )}

      {status === "remove" && (
        <label
          htmlFor="confirm-modal"
          className="btn btn-neutral"
          onClick={() => dispatch(modalActions.set(modal))}
        >
          Remove Files
        </label>
      )}
    </form>
  );
};

export default ResultForm;
