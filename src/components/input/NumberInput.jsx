import { useEffect, useState } from "react";
import { styles, delay } from "../../helpers/form";

const NumberInput = (props) => {
  const {
    name,
    title,
    layout = "",
    validate = null,
    keyword,
    limit: { min = 0, max = 999, step, unit },
    state: { state = {}, setState } = {},
    error: { error: stateError = {}, setError: setStateError } = {},
  } = props;

  const [input, setInput] = useState(state[keyword] || "");
  const [error, setError] = useState("");
  const [touch, setTouch] = useState(false);
  const [status, setStatus] = useState("base");

  useEffect(() => {
    let timeout;
    if (validate && touch) {
      if (stateError[keyword] && !error) {
        setError(`${title} ${stateError[keyword]}`);
        setStatus("invalid");
        setState((state) => ({ ...state, [keyword]: "" }));
      } else {
        timeout = setTimeout(() => {
          const error = validate(input, title, unit, min, max);
          setError(error);
          setStatus(error ? "invalid" : "valid");
          setState((state) => ({ ...state, [keyword]: error ? "" : input }));
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
  }, [input, stateError[keyword]]);

  return (
    <div className={`form-control ${layout}`}>
      <label htmlFor={name} className="label">
        <span className="label-text">{title}</span>
      </label>
      <div className="input-group">
        <input
          type="number"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={input}
          onChange={(e) => {
            if (!touch) setTouch(true);
            setInput(e.target.value);
          }}
          className={`input w-full ${styles[status]}`}
        />
        <span>{unit}</span>
      </div>
      {error && (
        <label htmlFor={name} className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default NumberInput;
