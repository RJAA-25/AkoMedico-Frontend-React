import { useEffect, useState } from "react";
import { select } from "../../helpers/form";
import { generateKey } from "../../helpers/utilities";

const Select = (props) => {
  const {
    name,
    title,
    layout,
    keyword,
    placeholder,
    options: { list, value, output },
    multiple = false,
    state: { state, setState },
    error: { error: stateError, setError: setStateError },
  } = props;

  const initial = multiple ? [] : "";
  const [input, setInput] = useState(state[keyword] || initial);
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
    if (stateError[keyword]) {
      setError(stateError[keyword]);
      setStatus("invalid");
      setState({ ...state, [keyword]: "" });
    }

    if (touch) {
      let error = input.length === 0 ? `${title} must be selected` : "";
      setError(error);
      setStatus(error ? "invalid" : "valid");
      setState({ ...state, [keyword]: error ? "" : input });
      setStateError({ ...stateError, [keyword]: error ? error : "" });
    }
  }, [input, stateError[keyword]]);

  return (
    <div className={`form-control ${layout}`}>
      <label className="label">
        <span className="label-text">{title}</span>
        <span className="label-text-alt"></span>
      </label>
      <select
        id={name}
        name={name}
        multiple={multiple}
        value={input}
        onChange={(e) => {
          if (!touch) setTouch(true);
          if (multiple) setInput(toggleValue(input, e.target.value));
          else {
            setInput(e.target.value);
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
