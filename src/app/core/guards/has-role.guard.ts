import { CanMatchFn } from '@angular/router';

export const hasRoleGuard: CanMatchFn = (route, segments) => {
  const allowedRoles = route.data?.['allowedRoles'];
  const roles = JSON.parse(sessionStorage.getItem('user') || '{}').roles;
  return roles.some((role: any) => Boolean(allowedRoles.includes(role)));
};
