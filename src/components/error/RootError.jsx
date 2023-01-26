import { useRouteError } from "react-router-dom";

const RootError = () => {
  const error = useRouteError();

  return (
    <div>
      RootError
      <p>
        {error.status} - {error.statusText}
      </p>
    </div>
  );
};

export default RootError;
