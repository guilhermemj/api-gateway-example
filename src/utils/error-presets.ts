import { AppErrorOptions } from "@guilhermemj/app-error";

export const ERR_INVALID_CONFIG: AppErrorOptions = {
  httpStatusCode: 400,
  code: "ERR_INVALID_CONFIG",
  level: "debug",
};

export const ERR_UNAUTHORIZED: AppErrorOptions = {
  httpStatusCode: 401,
  code: "ERR_UNAUTHORIZED",
  level: "debug",
};

export const ERR_FORBIDDEN: AppErrorOptions = {
  httpStatusCode: 403,
  code: "ERR_FORBIDDEN",
  level: "info",
};

export const ERR_NOT_FOUND: AppErrorOptions = {
  httpStatusCode: 404,
  code: "ERR_NOT_FOUND",
  level: "debug",
};
