export interface Poulailler {
  nom: string;
  capacite: number;
  description: string;
  entreprise: Entreprise;
}

export interface Lot {
  nom: string;
  type: string;
  nombre_volailles: number;
  date_debut: string;
  date_fin: string;
  description: string;
  user_creation: UserProfile;
  poulailler: Poulailler;
  entreprise: Entreprise;
}

export interface Entreprise {
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
