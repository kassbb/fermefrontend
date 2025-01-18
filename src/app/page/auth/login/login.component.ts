import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Standalone si nécessaire, sinon à retirer
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Connexion réussie',
          text: 'Vous êtes connecté avec succès',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.authService.storeTokens(response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        Swal.fire({
          title: 'Connexion échouée',
          text: "Nom d'utilisateur ou mot de passe incorrect",
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
