import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { verifyLoginGuard } from './core/guard/verify-login/verify-login.guard';
import { verifyRoleGuard } from './core/guard/verify-role/verify-role.guard';
import { UserListComponent } from './components/users/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [verifyLoginGuard, verifyRoleGuard],
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [verifyRoleGuard],
  },
  {
    path: 'users/register',
    component: UserFormComponent,
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canActivate: [verifyLoginGuard, verifyRoleGuard],
  },
  { path: '**', redirectTo: 'home' },
];
