import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class ForbiddenError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message ?? getReasonPhrase(StatusCodes.FORBIDDEN));
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
