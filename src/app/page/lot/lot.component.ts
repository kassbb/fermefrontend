import { Component, inject } from '@angular/core';

import { ActivatedRoute, Route } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import {
  Entreprise,
  Lot,
  Poulailler,
  TypeVolailles,
  TypeVolaillesLabels,
  UserProfile,
} from '../../model/Production';
import { LotServiceService } from '../../service/lot-service.service';
import { PoulaillerserviceService } from '../../service/poulaillerservice.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductionComponent } from '../production/production.component';
@Component({
  selector: 'app-lot',
  imports: [RouterModule, CommonModule, FormsModule, ProductionComponent],
  templateUrl: './lot.component.html',
  styleUrl: './lot.component.css',
})
export class LotComponent {
  id: number = undefined;
  route = inject(ActivatedRoute);
  items: MenuItem[] | undefined;
  lots: Lot[] = [];
  filteredLots: Lot[] = [];
  poulaillers: Poulailler[] = [];
  selectedLotId: number | undefined;
  lot: Lot = {
    id: 0,
    nom: '',
    type: TypeVolailles.PONDEUSE,
    nombre_volailles: 0,
    active: true,
    date_debut: '',
    date_fin: '',
    description: '',
    poulailler: {} as Poulailler,
    entreprise: {} as Entreprise,
    user_creation: {} as UserProfile,
  };
  searchTerm: string = '';

  home: MenuItem | undefined;
  types = Object.values(TypeVolailles);
  datefilter: Date;
  constructor(
    private lotService: LotServiceService,
    private poulaillerService: PoulaillerserviceService
  ) {}
  getTypeLabel(type: TypeVolailles): string {
    return TypeVolaillesLabels[type];
  }
  selectLot(id: number) {
    this.selectedLotId = id;
    console.log('Lot sélectionné:', this.selectedLotId);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.items = [
      { icon: 'pi pi-sitemap' },
      { icon: 'pi pi-book' },
      { icon: 'pi pi-wallet' },
      { icon: 'pi pi-shopping-bag' },
      { icon: 'pi pi-calculator' },
    ];

    this.home = { icon: 'pi pi-home' };
    this.loadLots();
    this.loadPoulaillers();
  }
  loadLots() {
    this.lotService.getLots(this.id).subscribe({
      next: (response) => {
        this.lots = response;
        this.filteredLots = response;
        
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
    });
  }

  loadPoulaillers() {
    this.poulaillerService.getPoulailler().subscribe({
      next: (response) => {
        this.poulaillers = response;
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
    });
  }

  searchLots() {
    if (this.searchTerm) {
      this.filteredLots = this.lots.filter((lot) =>
        lot.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLots = this.lots;
    }
    if (this.datefilter) {
      this.filteredLots = this.filteredLots.filter((lot) =>
        lot.date_debut.includes(this.datefilter.toISOString().split('T')[0])
      );
    }
  }

  onAddLot(formValue: any) {
    this.lotService.addLot(formValue).subscribe({
      next: (response) => {
        Swal.fire('Lot ajouté avec succès', '', 'success');
        this.loadLots();
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
  actver(id: number) {
    this.lotService.actver(id).subscribe({
      next: (response) => {
        Swal.fire('Lot activé avec succès', '', 'success');
        this.loadLots();
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
}
