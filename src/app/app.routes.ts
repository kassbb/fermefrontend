import { Routes } from '@angular/router';

import { HomeComponent } from './page/dashbord/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilComponent } from './page/profil/profil.component';
import { EntrepriseComponent } from './page/entreprise/entreprise.component';

import { LoginComponent } from './page/auth/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'entreprise', component: EntrepriseComponent },
    ],
  },

  { path: '**', redirectTo: '/login' },
];
