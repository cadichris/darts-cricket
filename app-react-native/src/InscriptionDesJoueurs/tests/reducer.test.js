import deepFreeze from "deep-freeze";
import inscriptionDesJoueurs from "../reducer";
import { choisirJeu, desinscrireJoueur, inscrireJoueur } from "../actions";

describe("reducer Inscription des joueurs", () => {
  it("retourne le state initial", () => {
    expect(inscriptionDesJoueurs(undefined, {})).toEqual({
      inscrits: [],
      jeuxDisponibles: ["burma", "cricket"],
      jeuChoisi: "burma",
      laPartiePeutDemarrer: false
    });
  });

  it("inscrit des joueurs", () => {
    const deuxInscrits = executer([inscrireJoueur("A"), inscrireJoueur("B")]);

    expect(deuxInscrits.inscrits).toEqual(["A", "B"]);
  });

  it("désinscrit des joueurs", () => {
    const apresDesinscription = executer([
      inscrireJoueur("A (va être désinscrit)"),
      inscrireJoueur("B"),
      desinscrireJoueur("A (va être désinscrit)")
    ]);

    expect(apresDesinscription.inscrits).toEqual(["B"]);
  });

  it("n'inscrit pas 2 fois le même joueur", () => {
    const apresPlusieursFoisLeMemeInscrit = executer([
      inscrireJoueur("A"),
      inscrireJoueur("A"),
      inscrireJoueur("A")
    ]);

    expect(apresPlusieursFoisLeMemeInscrit.inscrits).toEqual(["A"]);
  });

  it("permet de choisir un jeu", () => {
    const apresChoixDeJeu = executer([choisirJeu("mon jeu favori")]);

    expect(apresChoixDeJeu.jeuChoisi).toBe("mon jeu favori");
  });

  it("permet de démarrer la partie dès qu'on a 2 inscrits", () => {
    const avecDeuxInscrits = executer([
      inscrireJoueur("#1"),
      inscrireJoueur("#2")
    ]);

    expect(avecDeuxInscrits.laPartiePeutDemarrer).toBe(true);

    const avecUnSeulRestant = executer(
      [desinscrireJoueur("#2")],
      avecDeuxInscrits
    );

    expect(avecUnSeulRestant.laPartiePeutDemarrer).toBe(false);
  });
});

const executer = (actions, stateInitial = undefined) =>
  actions.reduce((state, action) => {
    const nextState = inscriptionDesJoueurs(state, action);
    deepFreeze(nextState);
    return nextState;
  }, stateInitial);