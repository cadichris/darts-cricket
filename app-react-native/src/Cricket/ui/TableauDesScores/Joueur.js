import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {FontSizes, Styles, Textes} from '../../../styles';

const Joueur = ({nom}) => (
  <View style={[{flex: 1, justifyContent: 'center'}, Styles.bordureBasse]}>
    <Text
      numberOfLines={1}
      style={[
        Textes.titre,
        {
          fontSize: FontSizes.standard,
          textAlign: 'center',
          paddingHorizontal: 10,
        },
      ]}>
      {nom}
    </Text>
  </View>
);

Joueur.propTypes = {
  nom: PropTypes.string.isRequired,
};

export default Joueur;
