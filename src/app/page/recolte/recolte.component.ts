import { RecolteService } from './../../services/recolte.service';
import { Component, inject, OnInit, signal } from '@angular/core';

import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Alveole, Stock } from '../../model/stock.model';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-recolte',
  templateUrl: './recolte.component.html',

  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class RecolteComponent {
  id: number;
  alveoles: Alveole[] = [];
  stock: Stock[] = [];
  stockService = inject(StockService);
  modal = signal('ajouter');

  constructor(
    private route: ActivatedRoute,
    private alveoleService: RecolteService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stock = data;
        this.stock.filter((s) => {
          if (s.categorie === 'Alveole') {
            this.stock.push(s);
          }
        });
        console.log('stock', this.stock);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des stocks :', error);
      },
    });
    this.Alveoles();
    this.alveoleForm.patchValue({
      poulailler: this.id,
    });
  }

  alveoleForm: FormGroup = new FormGroup({
    stock: new FormControl('', [Validators.required]),

    capacite_max: new FormControl('', [Validators.required]),
    nombre_oeufs: new FormControl('', [Validators.required]),
    date_creation: new FormControl('', [Validators.nullValidator]),
    date_mise_a_jour: new FormControl('', [Validators.nullValidator]),

    poulailler: new FormControl('', [Validators.nullValidator]),
  });

  Alveoles() {
    this.alveoleService.getalevioles().subscribe({
      next: (response) => {
        this.alveoles = response;
      },
      error: (error) => {
        console.error("Erreur lors de la recherche d'alvéole :", error);
      },
    });
  }
  onSubmit() {
    console.log(this.alveoleForm.value);

    this.alveoleService.ajouterRecolte(this.alveoleForm.value).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          title: 'Succès',
          text: "L'alvéole a été ajoutée avec succès",
          icon: 'success',
        });
      },

      error: (error) => {
        console.error("Erreur lors de l'ajout d'alvéole :", error);
        Swal.fire({
          title: 'Erreur',
          text: "L'alvéole n'a pas été ajoutée",
          icon: 'error',
        });
      },
    });
    this.alveoleForm.reset();
  }

  supprimerAlveole(id: number) {
    this.alveoleService.supprimerAlveole(id).subscribe({
      // confirmation swal pour la suppression
      next: (response) => {
        Swal.fire({
          title: 'Succès',
          text: "L'alvéole a été supprimée avec succès",
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.Alveoles();
        });
      },
      error: (error) => {
        console.error("Erreur lors de la suppression d'alvéole :", error);

        Swal.fire({
          title: 'Erreur',
          text: "L'alvéole n'a pas été supprimée",
          icon: 'error',
        });
      },
    });
  }

  trouverAlviol(id: number) {
    this.alveoleService.trouverAlveoleDisponible(this.id).subscribe({
      next(value) {
        Swal.fire({
          title: 'success',
          text: ` vous avez un aleviole libre ${value}`,
          icon: 'success',
        });
        console.log('alviole libre', value);
      },
      // complete: () => {
      //   Swal.fire('warning', "pas d'avleviole");
      // },
    });
  }

  modifier(id: number, alviole: any) {
    this.alveoleService.modifierAlviole(id, alviole).subscribe({
      next: (val) => {
        console.log('succes');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getaleviole(alviole: any) {
    this.alveoleForm.patchValue(alviole);
    this.modal.set('Modifier');
  }
}
