export interface Stock {
  id?: number;
  categorie: string;
  nom: string;
  quantite: number;
  unite_mesure: string;
  capacite_max: number;
  seuil_alerte: number;
  prix_unitaire: number;
  entreprise: number;
  date_creation?: string;
  date_mise_a_jour?: string;
}
export interface Alveole {
  id?: number;
  stock: number;
  numero: string;
  capacite_max: number;
  nombre_oeufs: number;
  date_creation?: Date;
  date_mise_a_jour?: Date;
  poulailler?: number;
  entreprise?: number;
}
