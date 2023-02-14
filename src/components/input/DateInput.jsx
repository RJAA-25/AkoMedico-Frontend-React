import { useEffect, useState } from "react";
import { styles, delay } from "../../helpers/form";

const DateInput = (props) => {
  const {
    name,
    title,
    layout = "",
    validate = null,
    keyword,
    readOnly = false,
    limit: { min, max },
    state: { state = {}, setState } = {},
    error: { error: stateError = {}, setError: setStateError } = {},
  } = props;

  const [error, setError] = useState("");
  const [touch, setTouch] = useState(false);
  const [status, setStatus] = useState("base");

  useEffect(() => {
    let timeout;
    let input = state[keyword];

    if (readOnly) {
      setError("");
      setStatus("base");
      setTouch(false);
      return;
    }

    if (validate && touch) {
      if (stateError[keyword] && !error) {
        setError(`${title} ${stateError[keyword]}`);
        setStatus("invalid");
      } else {
        timeout = setTimeout(() => {
          const error = validate(input, min, max);
          setError(error);
          setStatus(error ? "invalid" : "valid");
          setStateError((stateError) => ({
            ...stateError,
            [keyword]: error ? error : "",
          }));
        }, delay);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [min, readOnly, state[keyword], stateError[keyword]]);

  return (
    <div className={`form-control ${layout}`}>
      <label htmlFor={name} className="label">
        <span className="label-text">{title}</span>
      </label>
      <input
        type="date"
        name={name}
        id={name}
        value={state[keyword]}
        onChange={(e) => {
          if (!touch) setTouch(true);
          setState((state) => ({ ...state, [keyword]: e.target.value }));
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

export default DateInput;
