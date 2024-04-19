import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LogIn, SignUp, PokemonDetails, Cart} from '@screens';
import {useDispatch} from 'react-redux';

const Navigation = props => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => (
            <Button
              title={'Cart'}
              onPress={() => {
                navigation.navigate('Cart');
              }}></Button>
          ),
        }}>
        {() => <HomeScreen />}
      </Stack.Screen>
      <Stack.Screen name="PokemonDetails">
        {() => <PokemonDetails />}
      </Stack.Screen>
      <Stack.Screen name="Cart">{() => <Cart />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default Navigation;
