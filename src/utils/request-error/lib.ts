import { RequestErrorType } from './types';

export class RequestError extends Error {
  code: RequestErrorType['code'];
  httpStatus: RequestErrorType['httpStatus'];

  constructor(props: RequestErrorType, customMessage?: string) {
    super(customMessage || props.message);

    this.code = props.code;
    this.name = props.name || this.constructor.name;
    this.httpStatus = props.httpStatus || 500;

    Error.captureStackTrace(this, this.constructor);
  }
}
