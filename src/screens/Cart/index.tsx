import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PokemonItemCartType} from 'src/utils/definitions';
import {addToCart, removeFromCart} from 'src/features/cart/cart';

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const renderedItem = ({item}: {item: PokemonItemCartType}) => {
    return (
      <View style={styles.container}>
        <Text>
          Pokemon: {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text>Quantity:{item.quantity}</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            title={'+'}
            onPress={() => {
              dispatch(addToCart(item));
            }}
          />
          <Button
            title={'-'}
            onPress={() => {
              dispatch(removeFromCart(item));
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <View>
        <FlatList
          data={cart.cart}
          keyExtractor={item => item.url} //Inline Function
          renderItem={renderedItem}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={20}
          inverted
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
});
