export const styles = {
  valid: "input-success",
  base: "input-bordered",
  invalid: "input-error",
};

export const select = {
  valid: "select-success",
  base: "select-bordered",
  invalid: "select-error",
};

export const delay = 500;

export const limit = 1000;

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// /\A[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/;

export const dateRegex = /\d{4}-(0\d|1[0-2])-(0\d|[12]\d|3[01])/;
