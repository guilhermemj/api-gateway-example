import { RequestHandler } from '@guilhermemj/micro-web-server';
import AppError from '@guilhermemj/app-error';

import { ERR_FORBIDDEN, ERR_UNAUTHORIZED } from '../utils/error-presets';

const getAllowedGroups = (aclGroups: Array<string>): Array<string> => (
  aclGroups.filter(acl => !acl.startsWith('!'))
);

const getDisallowedGroups = (aclGroups: Array<string>): Array<string> => (
  aclGroups
    .filter(acl => acl.startsWith('!'))
    .map(acl => acl.replace('!', ''))
);

export default (aclGroups: Array<string>): RequestHandler => {
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

  return (req, res, next): void => {
    const { user } = res.locals;

    if (!user) {
      throw new AppError("Authentication required", ERR_UNAUTHORIZED);
    }

    if (!Array.isArray(user.acl) || !userHasAccess(user.acl)) {
      throw new AppError("Permission denied", ERR_FORBIDDEN);
    }

    next();
  };
};
