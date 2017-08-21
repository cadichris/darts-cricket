import React from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Textes } from "../styles"

export default ({ symbole, nombre }) => {
  let croix = []

  for (let i = 0; i < nombre; i++) {
    croix.push(
        <Animatable.Text key={i}
                         animation="bounceIn"
                         easing="ease-out-back"
                         duration={1300}
                         style={[Textes.basique, {
                           fontSize: 20,
                           textAlign: 'center',
                           letterSpacing: 3
                         }]}>
          {symbole}
        </Animatable.Text>
    )
  }

  return <View>{croix}</View>
}