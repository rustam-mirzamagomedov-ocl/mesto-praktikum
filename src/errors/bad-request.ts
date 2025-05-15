import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message ?? getReasonPhrase(StatusCodes.BAD_REQUEST));
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
