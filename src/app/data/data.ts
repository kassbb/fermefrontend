import { Entreprise, Lot, Poulailler } from "../model/Production";

export const poulaillers: Poulailler[] = [
    {
      nom: "Poulailler A",
      capacite: 500,
      description: "Un grand poulailler moderne avec ventilation automatique.",
      entreprise: {
        name: "Ferme Avicole Mali",
        owner: {
          id: 1,
          user: 101,
          phone_number: "+223 66012345",
          address: "Bamako, Mali",
          photo: "https://example.com/photo1.jpg",
          annee_experience: 10,
          entreprise: 1
        },
        address: "Route de Koulikoro, Bamako",
        phone_number: "+223 20234567",
        email: "contact@fermeavicole.ml",
        website: "https://fermeavicole.ml",
        description: "Spécialisée dans l'élevage de volailles de qualité."
      }
    },
    {
      nom: "Poulailler B",
      capacite: 300,
      description: "Poulailler équipé pour l'élevage biologique.",
      entreprise: {
        name: "Ferme Avicole Mali",
        owner: {
          id: 1,
          user: 101,
          phone_number: "+223 66012345",
          address: "Bamako, Mali",
          photo: "https://example.com/photo1.jpg",
          annee_experience: 10,
          entreprise: 1
        },
        address: "Route de Koulikoro, Bamako",
        phone_number: "+223 20234567",
        email: "contact@fermeavicole.ml",
        website: "https://fermeavicole.ml",
        description: "Spécialisée dans l'élevage de volailles de qualité."
      }
    }
  ];
  
 export const lots: Lot[] = [
    {
      nom: "Lot de poulets de chair",
      type: "Poulets de chair",
      nombre_volailles: 200,
      date_debut: "2025-01-01",
      date_fin: "2025-03-01",
      description: "Lot destiné à la vente pour consommation.",
      user_creation: {
        id: 2,
        user: 102,
        phone_number: "+223 70012345",
        address: "Sikasso, Mali",
        photo: "https://example.com/photo2.jpg",
        annee_experience: 5,
        entreprise: 1
      },
      poulailler: poulaillers[0],
      entreprise: poulaillers[0].entreprise
    },
    {
      nom: "Lot de pondeuses",
      type: "Pondeuses",
      nombre_volailles: 150,
      date_debut: "2025-01-15",
      date_fin: "2025-07-15",
      description: "Lot pour la production d'œufs biologiques.",
      user_creation: {
        id: 3,
        user: 103,
        phone_number: "+223 68012345",
        address: "Kayes, Mali",
        photo: "https://example.com/photo3.jpg",
        annee_experience: 8,
        entreprise: 1
      },
      poulailler: poulaillers[1],
      entreprise: poulaillers[1].entreprise
    }
  ];
  
 export const entreprises: Entreprise[] = [
    {
      name: "Ferme Avicole Mali",
      owner: {
        id: 1,
        user: 101,
        phone_number: "+223 66012345",
        address: "Bamako, Mali",
        photo: "https://example.com/photo1.jpg",
        annee_experience: 10,
        entreprise: 1
      },
      address: "Route de Koulikoro, Bamako",
      phone_number: "+223 20234567",
      email: "contact@fermeavicole.ml",
      website: "https://fermeavicole.ml",
      description: "Spécialisée dans l'élevage de volailles de qualité."
    }
  ];
  