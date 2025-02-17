import { StockService } from './../../services/stock.service';
import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  nouvelArticle: Stock = {
    categorie: 'ALVEOLE',
    nom: '',
    quantite: 0,
    unite_mesure: 'PIECE',
    capacite_max: 0,
    seuil_alerte: 10,
    prix_unitaire: 0,
    entreprise: 1, // À adapter selon votre logique
  };

  constructor(private StockService: StockService) {}

  ngOnInit(): void {
    this.chargerStocks();
  }

  chargerStocks(): void {
    this.StockService.getStocks().subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des stocks', error);
      }
    );
  }

  ajouterArticle(): void {
    this.StockService.ajouterStock(this.nouvelArticle).subscribe(
      (nouveauStock) => {
        this.stocks.push(nouveauStock);
        this.reinitialiserFormulaire();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de l'article", error);
      }
    );
  }

  ajouterQuantite(article: Stock): void {
    const nouvelleQuantite = article.quantite + 1;
    this.mettreAJourQuantite(article, nouvelleQuantite);
  }

  retirerQuantite(article: Stock): void {
    const nouvelleQuantite = article.quantite - 1;
    this.mettreAJourQuantite(article, nouvelleQuantite);
  }

  private mettreAJourQuantite(article: Stock, nouvelleQuantite: number): void {
    if (nouvelleQuantite < 0) return;

    const stockModifie = { ...article, quantite: nouvelleQuantite };
    this.StockService.modifierStock(stockModifie).subscribe(
      (stockMaj) => {
        const index = this.stocks.findIndex((s) => s.id === stockMaj.id);
        if (index !== -1) {
          this.stocks[index] = stockMaj;
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la quantité', error);
      }
    );
  }

  private reinitialiserFormulaire(): void {
    this.nouvelArticle = {
      categorie: 'ALVEOLE',
      nom: '',
      quantite: 0,
      unite_mesure: 'PIECE',
      capacite_max: 0,
      seuil_alerte: 10,
      prix_unitaire: 0,
      entreprise: 1,
    };
  }

  async supprimerStock(stockId: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas annuler cette action !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
    });

    if (result.isConfirmed) {
      this.StockService.supprimerStock(stockId).subscribe({
        next: () => {
          this.stocks = this.stocks.filter((s) => s.id !== stockId);
          Swal.fire('Supprimé !', 'Le stock a été supprimé.', 'success');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du stock', error);
          Swal.fire(
            'Erreur !',
            'Une erreur est survenue lors de la suppression.',
            'error'
          );
        },
      });
    }
  }
}
