export interface Poulailler {
  id: number;
  nom: string;
  capacite: number;
  description: string;
  entreprise: Entreprise;
}

export interface Lot {
  id: number;
  nom: string;
  type: TypeVolailles;
  nombre_volailles: number;
  active: boolean;
  date_debut: string;
  date_fin: string;
  description: string;
  user_creation: UserProfile;
  poulailler: Poulailler;
  entreprise: Entreprise;
}
export enum TypeVolailles {
  PONDEUSE = 'PONDEUSE',
  CHAIR = 'CHAIR',
}
export const TypeVolaillesLabels: { [key in TypeVolailles]: string } = {
  [TypeVolailles.PONDEUSE]: 'Poule Pondeuse',
  [TypeVolailles.CHAIR]: 'Poule de Chair',
};

export enum TypeOeuf {
  PETIT = 'PETIT',
  GRAND = 'GRAND',
}
export interface Entreprise {
  id: number;
  name: string;
  owner: UserProfile;
  address: string;
  phone_number: string;
  email: string;
  website: string;
  description: string;
}
export interface UserProfile {
  id: number;
  user: number;
  phone_number: string;
  address: string;
  photo: string;
  annee_experience: number;
  entreprise: number;
}
export const role = ['ADMIN', 'CONTABLE', 'ELEVEUR', 'LIVREUR'];

export interface Production {
  id: number;
  date: string;
  heure: string;
  type_oeuf: string;
  quantite_oeufs_produits: number;
  poids: string;
  notes?: string;
  lot: number;
  user_creation: number;
  entreprise: number;
}
