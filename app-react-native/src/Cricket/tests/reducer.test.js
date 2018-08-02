import freeze from "deep-freeze";
import cricket from "../reducer";
import { demarrerPartie, lancerFlechette, nouvellePartie } from "../actions";

it("retourne le state initial", () => {
  expect(cricket(undefined, {})).toEqual({
    scores: [],
    vainqueurs: []
  });
});

it("démarre la partie", () => {
  const partieDemarree = executer([demarrerPartie(["J1", "J2"])]);

  expect(partieDemarree).toEqual({
    vainqueurs: [],
    scores: [
      {
        joueur: "J1",
        penalite: 0,
        cible: {
          15: { touches: 0, ferme: false },
          16: { touches: 0, ferme: false },
          17: { touches: 0, ferme: false },
          18: { touches: 0, ferme: false },
          19: { touches: 0, ferme: false },
          20: { touches: 0, ferme: false },
          25: { touches: 0, ferme: false }
        }
      },
      {
        joueur: "J2",
        penalite: 0,
        cible: {
          15: { touches: 0, ferme: false },
          16: { touches: 0, ferme: false },
          17: { touches: 0, ferme: false },
          18: { touches: 0, ferme: false },
          19: { touches: 0, ferme: false },
          20: { touches: 0, ferme: false },
          25: { touches: 0, ferme: false }
        }
      }
    ]
  });
});

it("modifie le score sur un lancer de fléchette", () => {
  const apresLancerDeJ1 = executer([
    demarrerPartie(["J1"]),
    lancerFlechette("J1", 20, 1)
  ]);

  expect(apresLancerDeJ1.scores[0].cible[20]).toEqual({
    touches: 1,
    ferme: false
  });
});

it("met fin à la partie sur le lancer qui désigne le vainqueur", () => {
  const partieAvecUnJoueur = executer([demarrerPartie(["J1"])]);

  const toutFermeSaufLeBull = [15, 16, 17, 18, 19, 20].reduce(
    (state, chiffre) => cricket(state, lancerFlechette("J1", chiffre, 3)),
    partieAvecUnJoueur
  );

  const fermerLeBull = lancerFlechette("J1", 25, 3);
  const partieTerminee = cricket(toutFermeSaufLeBull, fermerLeBull);

  expect(partieTerminee.vainqueurs).toEqual(["J1"]);
});

it("écrase la partie en cours au démarrage d'une nouvelle partie", () => {
  const partieViergeBobEtAlice = executer([demarrerPartie(["Bob", "Alice"])]);
  const partieEnCoursQuiRedemarre = executer([
    demarrerPartie(["John", "Franck"]),
    lancerFlechette("John", 20, 1),
    demarrerPartie(["Bob", "Alice"])
  ]);

  expect(partieEnCoursQuiRedemarre).toEqual(partieViergeBobEtAlice);
});

const executer = actions =>
  actions.reduce((state, action) => {
    const nextState = cricket(state, action);
    freeze(nextState);
    return nextState;
  }, undefined);
