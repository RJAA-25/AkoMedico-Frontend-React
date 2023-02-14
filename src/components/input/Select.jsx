import { useEffect, useState } from "react";
import { select } from "../../helpers/form";
import { generateKey } from "../../helpers/utilities";

const Select = (props) => {
  const {
    name,
    title,
    layout = "",
    keyword,
    readOnly,
    placeholder,
    options: { list, value, output },
    multiple = false,
    state: { state = {}, setState } = {},
    error: { error: stateError = {}, setError: setStateError } = {},
  } = props;

  const [error, setError] = useState("");
  const [touch, setTouch] = useState(false);
  const [status, setStatus] = useState("base");

  const toggleValue = (arr, value) => {
    if (value === "") return arr;
    console.log(arr, value);
    return arr.includes(Number(value))
      ? arr.filter((el) => el !== Number(value))
      : [...arr, Number(value)];
  };

  useEffect(() => {
    let input = state[keyword];

    if (readOnly) {
      setError("");
      setStatus("base");
      setTouch(false);
      return;
    }

    if (touch) {
      if (stateError[keyword] && !error) {
        setError(`${title} ${stateError[keyword]}`);
        setStatus("invalid");
      } else {
        let error = input.length === 0 ? `${title} must be selected` : "";
        setError(error);
        setStatus(error ? "invalid" : "valid");
        setStateError((stateError) => ({
          ...stateError,
          [keyword]: error ? error : "",
        }));
      }
    }
  }, [readOnly, state[keyword], stateError[keyword]]);

  return (
    <div className={`form-control ${layout}`}>
      <label className="label">
        <span className="label-text">{title}</span>
        <span className="label-text-alt"></span>
      </label>
      <select
        id={name}
        name={name}
        disabled={readOnly}
        multiple={multiple}
        size={1}
        value={state[keyword]}
        onChange={(e) => {
          if (!touch) setTouch(true);
          if (multiple)
            setState((state) => ({
              ...state,
              keyword: toggleValue(state[keyword], e.target.value),
            }));
          else {
            setState((state) => ({ ...state, [keyword]: e.target.value }));
          }
        }}
        className={`select w-full ${select[status]}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {list.map((item) => (
          <option key={generateKey()} value={item[value]}>
            {output(item)}
          </option>
        ))}
      </select>
      {error && (
        <label htmlFor={name} className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Select;
