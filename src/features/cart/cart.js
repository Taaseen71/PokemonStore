import {createSlice} from '@reduxjs/toolkit';

const findProducByName = (items, name) => {
  return items.find(item => item.name === name); //working
};

const initialState = {
  cart: [],
  cartTotal: 0,
  isFetching: false,
  failure: false,
  errorMessage: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //   state.cart = [...state.cart, action.payload];
      const foundProduct = findProducByName(state.cart, action.payload.name);

      if (foundProduct) {
        // add quantity
        console.log('Product Found', JSON.stringify(foundProduct)); //working

        const updatedCart = state.cart.map(item =>
          item.name === action.payload.name
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
        console.log('UPDATED CART', updatedCart);
        state.cart = updatedCart;
      } else {
        // add to cart
        state.cart = [...state.cart, {...action.payload, quantity: 1}];
        // state.total += addsomeCodehereforPokemonPrice
      }
    },
    clearCart: state => {
      state.cart = [];
    },
    removeFromCart: (state, action) => {
      const foundProduct = findProducByName(state.cart, action.payload.name);

      if (foundProduct) {
        if (foundProduct.quantity > 1) {
          //Reduce Quantity
          const updatedCart = state.cart.map(item =>
            item.name === action.payload.name
              ? {...item, quantity: item.quantity - 1}
              : item,
          );
          state.cart = updatedCart;
        } else {
          //remove from cart
          state.cart = state.cart.filter(
            item => item.name !== action.payload.name,
          );
        }
      } else {
        console.log('not in cart');
      }
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setFailure: (state, action) => {
      state.failure = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartTotal,
  setIsFetching,
  setFailure,
  setErrorMessage,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
