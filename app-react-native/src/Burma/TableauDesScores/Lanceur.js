import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { HAUTEUR_DE_CONTRAT } from "./TableauDesScores";
import { Couleurs } from "../../styles";

export const Lanceur = () => (
  <View style={{ height: HAUTEUR_DE_CONTRAT }}>
    <View
      style={{
        flex: 1,
        margin: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Couleurs.deux,
        borderRadius: 4
      }}
    >
      <Icon name="target" color="white" size={20} style={{ opacity: 0.85 }} />
    </View>
  </View>
);
