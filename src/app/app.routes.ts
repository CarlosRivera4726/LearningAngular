import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import {
  LoggedInAuthGuard,
  verifyLoginGuard,
} from './core/guard/verify-login/verify-login.guard';
import { verifyRoleGuard } from './core/guard/verify-role/verify-role.guard';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [verifyLoginGuard, verifyRoleGuard],
  },
  {
    path: 'user/create',
    component: UserFormComponent,
    canActivate: [verifyRoleGuard],
  },
  {
    path: 'user/register',
    component: UserFormComponent,
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canActivate: [verifyLoginGuard, verifyRoleGuard],
  },
  { path: 'product/create', component: ProductFormComponent },
  { path: 'upload', component: UploadImagesComponent },
  { path: '**', redirectTo: 'home' },
];
