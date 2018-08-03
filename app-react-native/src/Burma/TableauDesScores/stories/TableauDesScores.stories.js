import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import TableauDesScores from "../TableauDesScores";
import { Styles } from "../../../styles";
import burma from "../../reducer";
import { demarrerPartie, voleeSurChiffre } from "../../actions";

const partieDeTest = [
  demarrerPartie(["Noémie", "Christophe", "Olivier", "Baptiste"]),
  voleeSurChiffre("Noémie", 15, 0)
].reduce(burma, undefined);

storiesOf("Burma", module)
  .addDecorator(story => <View style={[Styles.container]}>{story()}</View>)
  .add("Tableau des scores", () => (
    <TableauDesScores scores={partieDeTest.scores} />
  ));
