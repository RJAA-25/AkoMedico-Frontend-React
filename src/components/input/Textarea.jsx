import { useEffect, useState } from "react";
import { delay, limit } from "../../helpers/form";

const Textarea = (props) => {
  const {
    name,
    title,
    layout,
    keyword,
    readOnly = false,
    state: { state, setState },
  } = props;

  const [input, setInput] = useState(state[keyword] || "");
  const [length, setLength] = useState(state[keyword].length || 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState({ ...state, [keyword]: input });
    }, delay);

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div className={`form-control ${layout}`}>
      <label htmlFor={name} className="label">
        <span className="label-text">{title}</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={input}
        className="textarea textarea-bordered w-full"
        placeholder="Enter your notes here..."
        onChange={(e) => {
          const current = e.target.value;
          if (current.length <= limit) {
            setInput(e.target.value);
            setLength(current.length);
          }
        }}
        readOnly={readOnly}
      >
        {input}
      </textarea>
      <label htmlFor={name} className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt">
          {length}/{limit}
        </span>
      </label>
    </div>
  );
};

export default Textarea;
