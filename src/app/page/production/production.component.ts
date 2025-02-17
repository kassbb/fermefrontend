import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionserviceService } from '../../service/productionservice.service';
import { Production, TypeOeuf } from '../../model/Production';
import { UserserviceService } from '../../service/userservice.service';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-production',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css',
})
export class ProductionComponent implements OnInit, OnChanges {
  id: number = undefined;
  user: any;
  productionservice = inject(ProductionserviceService);
  userservice = inject(UserserviceService);
  production_title: string = 'Production de poulailler';
  @Input() selectedLotId: number | undefined;
  productions: any[] = []; // Utilisez cette propriété pour stocker les productions récupérées

  // Données pour le formulaire
  production: Production = {
    id: 0,
    date: '',
    heure: '',
    type_oeuf: TypeOeuf.GRAND,
    quantite_oeufs_produits: 0,
    poids: '',
    notes: '',
    lot: 0,
    user_creation: 0,
    entreprise: 0,
  };

  productionForm = new FormGroup({
    date: new FormControl('', Validators.required),
    heure: new FormControl('', Validators.required),
    type_oeuf: new FormControl('', Validators.required),
    quantite_oeufs_produits: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    poids: new FormControl(''),
    notes: new FormControl(''),
    lot: new FormControl(0),
    user_creation: new FormControl(0),
  });

  getuser() {
    this.userservice.getCurrentUser().subscribe({
      next: (response) => {
        this.user = response;
        this.productionForm.patchValue({ user_creation: this.user.id });
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
    });
  }

  ngOnInit(): void {
    console.log('Lot ID sélectionné:', this.selectedLotId);
    this.getuser();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLotId'] && this.selectedLotId) {
      this.productionForm.patchValue({
        lot: this.selectedLotId,
      });
      this.loadProductions(this.selectedLotId);
    }
  }

  loadProductions(lotId: number) {
   
    this.productionservice.getProductionByLot(lotId).subscribe({
      next: (response: any[]) => {
        this.productions = response; 
        
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
    });
  }
  onAddProduction() {
console.log("donnee soumise",this.productionForm.value)
    if (this.productionForm.valid) {
      const productionData = this.productionForm.value;
     

      this.productionservice.addProduction(productionData).subscribe({
        next: (response) => {
          Swal.fire('Succès', 'Production ajoutée avec succès', 'success');
          this.loadProductions(this.selectedLotId); 
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la production:", err);
          Swal.fire(
            'Erreur',
            "Une erreur est survenue lors de l'ajout",
            'error'
          );
        },
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs requis', 'error');
    }
  }
}
