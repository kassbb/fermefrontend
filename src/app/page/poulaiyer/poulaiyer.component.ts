import { Component, inject } from '@angular/core';
import { Entreprise, Poulailler } from '../../model/Production';
import { EntrepriseService } from '../../service/entreprise.service';
import { PoulaillerserviceService } from '../../service/poulaillerservice.service';
//  import p-table de primeng
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-poulaiyer',
  imports: [TableModule, CommonModule, FormsModule, ButtonModule,RouterLink],
  templateUrl: './poulaiyer.component.html',
  styleUrl: './poulaiyer.component.css',
})
export class PoulaiyerComponent {
  searchTerm: string = '';
  filteredPoulaillers: Poulailler[] = [];
  poulaillers: Poulailler[] = [];
  poulailler: any = {};
  entreprise: any = {};
  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        { label: 'Refresh', icon: 'pi pi-refresh' },
        { label: 'Export', icon: 'pi pi-upload' },
      ],
    },
  ];
  constructor(
    protected entrepriseService: EntrepriseService,
    protected poulaillerservice: PoulaillerserviceService
  ) {}

  ngOnInit() {
    this.myentreprise();
    this.getPoulailler();
  }

  myentreprise() {
    this.entrepriseService.getMyEntreprise().subscribe({
      next: (response: Entreprise[]) => {
        this.entreprise = response[0];
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
    });
  }

  getPoulailler() {
    this.poulaillerservice.getPoulailler().subscribe({
      next: (response) => {
        this.poulaillers = response;
        this.filteredPoulaillers = response;
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
    });
  }

  onAddPoulailler(poulailler: Poulailler) {
    this.poulaillerservice.addPoulailler(poulailler).subscribe({
      next: (response) => {
        Swal.fire('Poulailler ajouté avec succès', '', 'success');
        this.getPoulailler();
      },
      error: (err) => {
        Swal.fire(
          'Erreur',
          err.error.detail || 'Une erreur est survenue',
          'error'
        );
      },
    });
  }

  searchPoulailler() {
    if (this.searchTerm && this.searchTerm.length > 0) {
      this.filteredPoulaillers = this.poulaillers.filter((p) =>
        p.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPoulaillers = this.poulaillers;
    }
  }
}
