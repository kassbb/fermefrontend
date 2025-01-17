import { Routes } from '@angular/router';
import {LoginComponent} from './page/auth/login/login.component';
import {HomeComponent} from './page/dashbord/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { ProfilComponent } from './page/profil/profil.component';

export const routes: Routes = [


  { path: 'login', component: LoginComponent }, // Route pour le composant de connexion
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
  // { path: '**', redirectTo: '/login' } // Gestion des routes non trouvées
  {
    path:'dashboard' ,component: DashboardComponent,
    children:[
      {path: 'profil', component:ProfilComponent},
    ]
  }

];
