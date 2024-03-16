export const getErrorMessage = (err: any) => {
  let message = '';

  if (err.message) {
    message = err.message;
  } else if (err.errors && err.errors.length) {
    message = err.errors[0].msg;
  }

  return message;
};

export const convertError = (err: any) => {
  let message = '';
  let error;

  if (err.message) {
    message = err.message;
    error = err;
  } else if (err.errors && err.errors.length) {
    message = err.errors[0].msg;
    error = err.errors[0];
  }

  return {
    message,
    error,
  };
};

export const formatMoney = (value: String | Number) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
