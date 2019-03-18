class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);

    this.name = 'NotAuthorizedError';
    this.status = 401;
  }
}

module.exports = NotAuthorizedError;
