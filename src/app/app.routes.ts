import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ChatComponent } from './components/chat/chat.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import UserListComponent from './components/users/user-list/user-list.component';
import { hasRoleGuard } from './core/guards/has-role.guard';
import { Rol } from './core/environments/environment';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
    canMatch: [isLoggedInGuard, hasRoleGuard],
    data:{
      allowedRoles: [Rol.ADMIN]
    }
  },
  {
    path: 'user/create',
    component: UserFormComponent,
    canMatch: [isLoggedInGuard, hasRoleGuard],
    data:{
      allowedRoles: [Rol.ADMIN]
    }
  },
  {
    path: 'user/register',
    component: UserFormComponent,
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canMatch: [isLoggedInGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  { 
    path: 'product/create', 
    component: ProductFormComponent, 
    canMatch: [isLoggedInGuard]
  },
  { 
    path: 'unauthorized',
    component: UnauthorizedComponent 
  },
  { path: '**', redirectTo: 'home' },
];
