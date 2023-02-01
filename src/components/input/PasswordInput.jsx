import { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { styles, delay } from "../../helpers/form";

const PasswordInput = (props) => {
  const {
    name,
    layout = "",
    validate = null,
    confirm = false,
    keyword,
    readOnly = false,
    state: { state = {}, setState } = {},
    error: { error: stateError = {}, setError: setStateError } = {},
  } = props;

  const confirmName = name.replace("password", "password_confirmation");
  const confirmKeyword = keyword + "_confirmation";

  const [show, setShow] = useState(false);
  const [touch, setTouch] = useState(false);
  const [input1, setInput1] = useState(state[keyword] || "");
  const [error1, setError1] = useState("");
  const [status1, setStatus1] = useState("base");
  const [input2, setInput2] = useState("");
  const [error2, setError2] = useState("");
  const [status2, setStatus2] = useState("base");

  useEffect(() => {
    let timeout;
    if (validate && touch) {
      if (stateError[keyword] && !error1) {
        setError1(`${stateError[keyword]}`);
        setStatus1("invalid");
        setState((state) => ({ ...state, [keyword]: "" }));
      } else if (confirm && stateError[confirmKeyword] && !error2) {
        setError2(`${stateError[confirmKeyword]}`);
        setStatus1("invalid");
        setState((state) => ({ ...state, [confirmKeyword]: "" }));
      } else {
        timeout = setTimeout(() => {
          const error = validate(input1);
          setError1(error);
          setStatus1(error ? "invalid" : "valid");
          setState((state) => ({ ...state, [keyword]: error ? "" : input1 }));
          setStateError((stateError) => ({
            ...stateError,
            [keyword]: error ? error : "",
          }));
          if (confirm) {
            if (input2.length === 0) {
              setStatus2("base");
              setState((state) => ({ ...state, [confirmKeyword]: "" }));
              setError2("");
            } else {
              setStatus2(input1 === input2 ? "valid" : "invalid");
              setError2(input1 === input2 ? "" : "Passwords do not match");
              setState((state) => ({
                ...state,
                [confirmKeyword]: input1 === input2 ? input1 : "",
              }));
              setStateError((stateError) => ({
                ...stateError,
                [confirmKeyword]:
                  input1 === input2 ? "" : "Passwords do not match",
              }));
            }
          }
        }, delay);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [input1, input2, stateError[keyword], stateError[confirmKeyword]]);

  return (
    <>
      <div className={`form-control ${layout}`}>
        <label htmlFor={name} className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="input-group">
          <input
            type={show ? "text" : "password"}
            id={name}
            name={name}
            value={input1}
            onChange={(e) => {
              if (!touch) setTouch(true);
              const current = e.target.value;
              current.slice(-1) !== " " ? setInput1(current) : null;
            }}
            className={`input w-full ${styles[status1]}`}
            readOnly={readOnly}
          />
          <span onClick={() => setShow((state) => !state)}>
            <Icon icon={show ? faEyeSlash : faEye} />
          </span>
        </div>
        {error1 && (
          <label htmlFor={name} className="label">
            <span className="label-text-alt text-error">{error1}</span>
          </label>
        )}
      </div>

      {confirm && (
        <div className={`form-control ${layout}`}>
          <label htmlFor={confirmName} className="label">
            <span className="label-text">Password Confirmation</span>
          </label>
          <div className="input-group">
            <input
              type={show ? "text" : "password"}
              id={confirmName}
              name={confirmName}
              value={input2}
              onChange={(e) => {
                const current = e.target.value;
                current.slice(-1) !== " " ? setInput2(current) : null;
              }}
              className={`input w-full ${styles[status2]}`}
            />
            <span onClick={() => setShow((state) => !state)}>
              <Icon icon={show ? faEyeSlash : faEye} />
            </span>
          </div>
          {error2 && (
            <label htmlFor={name} className="label">
              <span className="label-text-alt text-error">{error2}</span>
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default PasswordInput;
