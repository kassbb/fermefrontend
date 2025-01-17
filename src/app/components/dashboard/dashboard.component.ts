// filepath: /c:/ferme app/fermeapp/src/app/components/dashboard/dashboard.component.ts
import { Component, HostListener, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User } from '../../model/User';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Correction ici
})
export class DashboardComponent {
  isMobile: boolean = false;
  isSidebarVisible = true;

  // La sidebar est visible par défaut
  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // Définit si on est en mode mobile
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
