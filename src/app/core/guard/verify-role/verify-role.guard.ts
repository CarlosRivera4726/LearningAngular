import { CanActivateFn } from '@angular/router';

enum Rol {
  ADMIN = 'ADMINISTRADOR',
  CUSTOMER = 'CLIENTE',
  USER = 'USUARIO',
  SELLER = 'VENDEDOR',
}

export const verifyRoleGuard: CanActivateFn = (route, state) => {
  console.log(localStorage.getItem('role') !== Rol.ADMIN ? false : true);
  const role = localStorage.getItem('role') || '';
  // verify if role string contains ADMIN
  return role.includes(Rol.ADMIN);
};
