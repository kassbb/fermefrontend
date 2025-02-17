import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Entreprise } from '../../model/Production';
import { EntrepriseService } from '../../service/entreprise.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-entreprise',
  standalone: true,
  imports: [
    AvatarModule,
    OverlayBadgeModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    CommonModule,
  ],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css',
})
export class EntrepriseComponent implements OnInit {
  entrepriseservice = inject(EntrepriseService);
  entreprise: Entreprise | undefined;

  ngOnInit() {
    this.myentreprise();
  }

  myentreprise() {
    this.entrepriseservice.getMyEntreprise().subscribe({
      next: (response: Entreprise[]) => {
        this.entreprise = response[0];
        
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  onUpdateEntreprise(form: NgForm) {
    if (form.valid && this.entreprise) {
      const updatedEntreprise = { ...this.entreprise, ...form.value };

      this.entrepriseservice
        .updateEntreprise(this.entreprise.id, updatedEntreprise)
        .subscribe({
          next: (response) => {
           
            this.entreprise = response; 
            Swal.fire(
              'Succès',
              'Entreprise mise à jour avec succès',
              'success'
            );
          },
          error: (err) => {
            console.error(
              "Erreur lors de la mise à jour de l'entreprise:",
              err
            );
            Swal.fire(
              'Erreur',
              "Erreur lors de la mise à jour de l'entreprise",
              'error'
            );
          },
        });
    } else {
      
      Swal.fire('Erreur', 'Formulaire invalide', 'error');
    }
  }
}
