import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message ?? getReasonPhrase(StatusCodes.UNAUTHORIZED));
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
