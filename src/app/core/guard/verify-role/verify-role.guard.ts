import { CanActivateFn } from '@angular/router';
import { Rol } from '../../interfaces/users/iuser';

export const verifyRoleGuard: CanActivateFn = (route, state) => {
  console.log(
    localStorage.getItem('role') !== Rol.ADMIN.toString() ? false : true
  );
  return localStorage.getItem('role') !== Rol.ADMIN.toString() ? false : true;
};
