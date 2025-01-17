import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, OverlayBadgeModule, RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Correction de 'styleUrl' -> 'styleUrls'
})
export class SidebarComponent implements OnInit {
  role: string = 'admin'; // Le rôle sera défini dynamiquement
  links: any[] = [];
  activeClass = 'bg-gray-200 text-indigo-600 font-bold';

  // Déclaration de allLinks comme une propriété de la classe
  allLinks = {
    admin: [
      { name: 'Dashboard', href: '/dashboard', icon: 'pi pi-chart-line' },
      { name: 'Mon Profil', href: '/profil', icon: 'pi pi-users' },
      { name: 'Poulaillers', href: '/poulaillers', icon: 'pi pi-egg' },
      { name: 'Production', href: '/production', icon: 'pi pi-box' },
      { name: 'Stocks', href: '/stocks', icon: 'pi pi-warehouse' },
      { name: 'Livraisons', href: '/livraisons', icon: 'pi pi-truck' },
      { name: 'Employés', href: '/employes', icon: 'pi pi-id-card' },
      { name: 'Paramètres', href: '/parametres', icon: 'pi pi-cog' },
    ],
    eleveur: [
      { name: 'Dashboard', href: '/dashboard', icon: 'pi pi-chart-line' },
      { name: 'Mes Poulaillers', href: '/poulaillers', icon: 'pi pi-egg' },
      { name: 'Production', href: '/production', icon: 'pi pi-box' },
      { name: 'Stocks', href: '/stocks', icon: 'pi pi-warehouse' },
    ],
    livreur: [
      { name: 'Dashboard', href: '/dashboard', icon: 'pi pi-chart-line' },
      { name: 'Livraisons', href: '/livraisons', icon: 'pi pi-truck' },
      { name: 'Historique', href: '/historique', icon: 'pi pi-clock' },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.loadMenuBasedOnRole();
  }

  loadMenuBasedOnRole(): void {
    this.links = this.allLinks[this.role] || [];
  }
}
