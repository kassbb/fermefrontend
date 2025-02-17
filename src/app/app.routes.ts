import { Routes } from '@angular/router';

import { HomeComponent } from './page/dashbord/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilComponent } from './page/profil/profil.component';
import { EntrepriseComponent } from './page/entreprise/entreprise.component';

import { LoginComponent } from './page/auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { PoulaiyerComponent } from './page/poulaiyer/poulaiyer.component';
import { LotComponent } from './page/lot/lot.component';
import { ProductionComponent } from './page/production/production.component';
import { StockComponent } from './page/stock/stock.component';
import { RecolteComponent } from './page/recolte/recolte.component';

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
      { path: 'poulailler', component: PoulaiyerComponent },
      { path: 'poulailler-lot/:id', component: LotComponent },
      { path: 'production', component: ProductionComponent },
      { path: 'stock', component: StockComponent },
      { path: 'recolte/:id', component: RecolteComponent },
    ],
  },

  { path: '**', redirectTo: '/login' },
];
