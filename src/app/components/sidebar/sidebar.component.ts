import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { UsergroupeService } from '../../service/usergroupe.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

interface Link {
  name: string;
  href: string;
  icon: string;
}

export interface UserGroupResponse {
  user: string;
  groups: string[];
}

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, OverlayBadgeModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeRoles: string[] = []; // Liste des rôles actifs de l'utilisateur
  links: Link[] = [];
  groupe = inject(UsergroupeService);
  authService = inject(AuthService);
  router = inject(Router);
  user = '';

  activeClass = 'bg-gray-200 text-indigo-600 font-bold';

  baseLinks: Link[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'pi pi-chart-line' },
    { name: 'Mon Profil', href: '/profil', icon: 'pi pi-users' },
  ];

  allLinks: { [key: string]: Link[] } = {
    ADMIN: [
      ...this.baseLinks,
      { name: 'Entreprises', href: '/entreprise', icon: 'pi pi-briefcase' },
      { name: 'Poulaillers', href: '/poulailler', icon: 'pi pi-egg' },
      { name: 'Production', href: '/production', icon: 'pi pi-box' },
      { name: 'Stocks', href: '/stocks', icon: 'pi pi-warehouse' },
      { name: 'Livraisons', href: '/livraisons', icon: 'pi pi-truck' },
      { name: 'Employés', href: '/employes', icon: 'pi pi-id-card' },
      { name: 'Paramètres', href: '/parametres', icon: 'pi pi-cog' },
    ],
    COMTABLE: [
      ...this.baseLinks,
      { name: 'Entreprises', href: '/entreprise', icon: 'pi pi-briefcase' },
      { name: 'Production', href: '/production', icon: 'pi pi-box' },
      { name: 'Stocks', href: '/stocks', icon: 'pi pi-warehouse' },
    ],
    ELEVEUR: [
      ...this.baseLinks,
      { name: 'Poulaillers', href: '/poulailler', icon: 'pi pi-egg' },
      { name: 'Production', href: '/production', icon: 'pi pi-box' },
      { name: 'Stocks', href: '/stocks', icon: 'pi pi-warehouse' },
    ],
    LIVREUR: [
      ...this.baseLinks,
      { name: 'Livraisons', href: '/livraisons', icon: 'pi pi-truck' },
      { name: 'Historique', href: '/historique', icon: 'pi pi-clock' },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.getRole();
  }

  loadMenuBasedOnRole(): void {
    const allLinksForRoles = this.activeRoles
      .map((role) => this.allLinks[role] || [])
      .flat();

    const uniqueLinksMap = new Map<string, Link>();
    allLinksForRoles.forEach((link) => {
      if (!uniqueLinksMap.has(link.href)) {
        uniqueLinksMap.set(link.href, link);
      }
    });

    this.links = Array.from(uniqueLinksMap.values());
  }

  getRole() {
    this.groupe.getGroups().subscribe(
      (data: UserGroupResponse) => {
        console.log('User groups:', data.user);
        this.activeRoles = data.groups || []; 
        this.user = data.user;
        // Définit les rôles ou un tableau vide
        if (this.activeRoles.length === 0) {
          console.warn("Aucun rôle attribué à l'utilisateur.");
        }
        this.loadMenuBasedOnRole(); // Recharge le menu après avoir défini les rôles
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des groupes utilisateur:',
          error
        );
        if (error.status === 401) {
          // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    );
  }
  logout(){
    this.authService.logout();
    
  }
}
