import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'garage', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
  { path: 'garage', loadComponent: () => import('./pages/garage/garage').then(m => m.Garage), canActivate: [authGuard] },
  { path: '**', redirectTo: 'garage' }
];
