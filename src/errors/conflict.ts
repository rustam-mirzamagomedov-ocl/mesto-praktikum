import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class ConflictError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message ?? getReasonPhrase(StatusCodes.CONFLICT));
    this.statusCode = StatusCodes.CONFLICT;
  }
}
