import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';

const PokemonDetails = () => {
  const {pokemonID} = useRoute().params;
  console.log('POKEMONID', pokemonID);
  return (
    <View>
      <SvgUri
        width="300"
        height="300"
        uri={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
      />
      <Text>PokemonDetails {pokemonID}</Text>
    </View>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({});
