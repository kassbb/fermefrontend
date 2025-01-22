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
