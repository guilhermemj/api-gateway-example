import { RequestErrorType } from './types';

export const INVALID_CONFIG_ERROR: RequestErrorType = {
  name: 'InvalidConfigError',
  code: 'invalidConfig',
  message: 'Informed config is not valid',
  httpStatus: 400,
};

export const UNAUTHORIZED_ERROR: RequestErrorType = {
  name: 'UnauthorizedError',
  code: 'unauthorized',
  message: 'Authentication required',
  httpStatus: 401,
};

export const NOT_ALLOWED_ERROR: RequestErrorType = {
  name: 'NotAllowedError',
  code: 'notAllowed',
  message: 'Permission denied',
  httpStatus: 403,
};

export const NOT_FOUND_ERROR: RequestErrorType = {
  name: 'NotFoundError',
  code: 'notFound',
  message: 'The requested resource was not found',
  httpStatus: 404,
};

export const RESOURCE_CONFLICT_ERROR: RequestErrorType = {
  name: 'ResourceConflictError',
  code: 'resourceConflict',
  message: 'The resource already exists or could not be updated',
  httpStatus: 409,
};

export const UNCAUGHT_EXCEPTION_ERROR: RequestErrorType = {
  name: 'UncaughtExceptionError',
  code: 'uncaughtException',
  message: 'Oops, something went wrong',
  httpStatus: 500,
};
