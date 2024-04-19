import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ApiHelper from 'src/helpers/ApiHelper';
import {SvgUri} from 'react-native-svg';
import {addToCart, clearCart} from 'src/features/cart/cart';
import {PokemonItemType} from 'src/utils/definitions';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  PokemonDetails: {pokemonID: string} | undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const [pokeDex, setPokeDex] = useState<PokemonItemType[]>([]);

  const getData = async () => {
    try {
      const response = await ApiHelper.get();
      const data = await response.data.results;
      setPokeDex(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const renderedItem = ({item}: {item: PokemonItemType}) => {
    const pokemonID = item.url.split('/').slice(-2, -1)[0];
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PokemonDetails', {pokemonID: pokemonID})
          }>
          <SvgUri
            width="100"
            height="100"
            uri={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
          />
          <Text>
            {pokemonID}.{' '}
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <TouchableOpacity
            style={{backgroundColor: '#DDDDDD'}}
            onPress={() => {
              dispatch(addToCart(item));
            }}>
            <Text style={{justifyContent: 'center'}}>AddToCart</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: '#DDDDDD'}}
        onPress={() => {
          dispatch(clearCart());
        }}>
        <Text>Clear Cart</Text>
      </TouchableOpacity>
      <FlatList
        data={pokeDex}
        keyExtractor={item => item.url}
        numColumns={3}
        renderItem={renderedItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
});
