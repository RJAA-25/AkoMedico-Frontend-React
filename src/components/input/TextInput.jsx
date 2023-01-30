import { useEffect, useState } from "react";
import { styles, delay } from "../../helpers/form";

const TextInput = (props) => {
  const {
    name,
    title,
    layout,
    validate = null,
    keyword,
    readOnly = false,
    state: { state, setState },
    error: { error: stateError, setError: setStateError },
  } = props;

  const [input, setInput] = useState(state[keyword] || "");
  const [error, setError] = useState("");
  const [touch, setTouch] = useState(false);
  const [status, setStatus] = useState("base");

  useEffect(() => {
    if (stateError[keyword]) {
      setError(stateError[keyword]);
      setStatus("invalid");
      setState({ ...state, [keyword]: "" });
    }

    let timeout;
    if (validate && touch) {
      timeout = setTimeout(() => {
        const error = validate(input, title);
        setError(error);
        setStatus(error ? "invalid" : "valid");
        setState({ ...state, [keyword]: error ? "" : input });
        setStateError({ ...stateError, [keyword]: error ? error : "" });
      }, delay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [input, stateError[keyword]]);

  return (
    <div className={`form-control ${layout}`}>
      <label htmlFor={name} className="label">
        <span className="label-text">{title}</span>
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={input}
        onChange={(e) => {
          if (!touch) setTouch(true);
          setInput(e.target.value);
        }}
        className={`input w-full ${styles[status]}`}
        readOnly={readOnly}
      />
      {error && (
        <label htmlFor={name} className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default TextInput;
