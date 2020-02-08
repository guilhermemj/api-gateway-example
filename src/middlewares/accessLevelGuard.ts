import { Request, Response, NextFunction, Controller } from '@guilhermemj/micro-web-server';
import { RequestError, UNAUTHORIZED_ERROR, NOT_ALLOWED_ERROR } from 'src/utils/request-error';

const getAllowedGroups = (aclGroups: Array<string>): Array<string> => (
  aclGroups.filter(acl => !acl.startsWith('!'))
);

const getDisallowedGroups = (aclGroups: Array<string>): Array<string> => (
  aclGroups
    .filter(acl => acl.startsWith('!'))
    .map(acl => acl.replace('!', ''))
);

export default (aclGroups: Array<string>): Controller => {
  const allowedGroups = getAllowedGroups(aclGroups);
  const disallowedGroups = getDisallowedGroups(aclGroups);

  const userHasAccess = (userAcl: Array<string>): boolean => {
    if (allowedGroups.length && !userAcl.some(acl => allowedGroups.includes(acl))) {
      return false;
    }

    if (disallowedGroups.length && userAcl.some(acl => disallowedGroups.includes(acl))) {
      return false;
    }

    return true;
  };

  return (req: Request, res: Response, next: NextFunction): void => {
    const { user } = res.locals;

    if (!user) {
      throw new RequestError(UNAUTHORIZED_ERROR);
    }

    if (!Array.isArray(user.acl) || !userHasAccess(user.acl)) {
      throw new RequestError(NOT_ALLOWED_ERROR);
    }

    next();
  };
};
