import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { entreprises } from '../../data/data'; 


@Component({
  selector: 'app-entreprise',
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
export class EntrepriseComponent {
entreprise = entreprises[0];

}
