import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartValues: [],
  totalPrice: 0,
};

const CartReducer = createSlice({
  name: "CartReducer",
  initialState,
  reducers: {
    incrementCart: (state, action) => {
      state.cartValues.push(action.payload);

      const priceArray = state.cartValues.map((obj) => {
        return obj.productPrice;
      });
      state.totalPrice = priceArray.reduce((a, b) => a + b);
    },

    decrementCart: (state, action) => {
      const index = state.cartValues.findIndex(
        (obj) => obj.productName === action.payload.productName
      );
      if (index > -1) {
        state.cartValues.splice(index, 1);
        state.totalPrice -= action.payload.productPrice;
      }
      else{
        window.alert("Item not present in the Cart")
      }
    },
  },
});

export const { incrementCart, decrementCart } = CartReducer.actions;
export default CartReducer.reducer;
