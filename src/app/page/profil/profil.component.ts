import { Component, OnInit } from '@angular/core';

import { User } from '../../model/User';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserProfile } from '../../model/Production';

@Component({
  selector: 'app-profil',
  standalone: true, // Si tu utilises des composants autonomes
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
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'], // Correction : styleUrls
})
export class ProfilComponent implements OnInit {
  profile: UserProfile = {
    id: 1,
    user: 1,
    phone_number: '1234567890',
    address: 'Abidjan',
    photo:
      'https://media.istockphoto.com/id/184376069/fr/photo/grave-jeune-homme-visage-sans-expression-photo-didentit%C3%A9-judiciaire-portrait.jpg?s=612x612&w=0&k=20&c=XQoRSozK5ODslcmyvCAsohlYHIpOyKfVUN-CVsNYIuE=',
    annee_experience: 2,
    entreprise: 0,
  };

  user: User = {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Profil mis à jour:', this.profile);
    Swal.fire({
      title: 'Drag me!',
      icon: 'success',
      draggable: true,
    });

    // Ajoute ici la logique pour sauvegarder le profil dans la base de données.
  }
  onReset(Form: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const formValues = Form.value;
        console.log(
          'Valeurs du formulaire avant réinitialisation :',
          formValues
        );
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });

    // Récupérer les valeurs actuelles du formulaire
  }
}
