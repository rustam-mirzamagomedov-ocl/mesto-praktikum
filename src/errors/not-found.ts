import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message ?? getReasonPhrase(StatusCodes.NOT_FOUND));
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
