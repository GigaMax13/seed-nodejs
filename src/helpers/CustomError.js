class CustomError {
  static handler(res, err) {
    err.stack && console.error(err.stack); // eslint-disable-line

    if (err instanceof CustomError && (err.message && err.code)) {
      const { code, message } = err;

      res.status(code).send({
        success: false,
        message,
      });
    } else {
      res.status(500).send({
        success: false,
        message: __('server.error.500'),
      });
    }
  }

  constructor(message, code = 500, stack) {
    this.message = message;
    this.code = code;
    this.stack = stack;
  }
}

export { CustomError };
