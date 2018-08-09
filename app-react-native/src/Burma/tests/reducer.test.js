import deepFreeze from "deep-freeze";
import burma from "../reducer";
import {
  demarrerPartie,
  voleeSurBull,
  voleeSurChiffre,
  voleeSurDouble,
  voleeSurTriple
} from "../actions";
import { POINTS_INITIAUX } from "../arbitrage/Score";

it("retourne le state initial", () => {
  expect(burma(undefined, {})).toEqual({
    chiffreCourant: undefined,
    lanceur: undefined,
    vainqueur: undefined,
    scores: {}
  });
});

it("démarre la partie", () => {
  const burmaEnCoursAvec2joueurs = executer([demarrerPartie(["J1", "J2"])]);

  expect(burmaEnCoursAvec2joueurs).toEqual({
    chiffreCourant: "15",
    lanceur: "J1",
    scores: {
      J1: [{ contrat: "DEPART", points: POINTS_INITIAUX }],
      J2: [{ contrat: "DEPART", points: POINTS_INITIAUX }]
    },
    vainqueur: undefined
  });
});

describe("fin de la partie", () => {
  it("ne termine pas la partie tant que les lanceurs n'ont pas joué le contrat du BULL", () => {
    const burmaEnCours = executer([
      demarrerPartie(["J1"]),
      voleeSurChiffre("J1", 15, 0),
      voleeSurChiffre("J1", 16, 0)
    ]);

    expect(burmaEnCours.vainqueur).toBe(undefined);
  });

  it("termine la partie après le contrat du BULL du dernier lanceur", () => {
    const toutesLesVoleesDuBurma = [
      voleeSurChiffre("J1", 15, 0),
      voleeSurChiffre("J1", 16, 0),
      voleeSurDouble("J1", []),
      voleeSurChiffre("J1", 17, 0),
      voleeSurChiffre("J1", 18, 0),
      voleeSurTriple("J1", []),
      voleeSurChiffre("J1", 19, 0),
      voleeSurChiffre("J1", 20, 0),
      voleeSurBull("J1", 0, 0)
    ];

    const burmaTermine = executer([
      demarrerPartie(["J1"]),
      ...toutesLesVoleesDuBurma
    ]);

    expect(burmaTermine.vainqueur).toBe("J1");
  });
});

const executer = actions =>
  actions.reduce((state, action) => {
    const nextState = burma(state, action);
    deepFreeze(nextState);
    return nextState;
  }, undefined);