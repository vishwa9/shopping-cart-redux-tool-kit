import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false
  },
  reducers: {
    replaceData(state, action) {
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.itemsList = action.payload.itemsList || [];
        state.showCart = action.payload.showCart;
    },
    addToCart(state, action) {
        state.changed = true;
      const newItem = action.payload;
      //to check if item already exist in cart
      const existingItems = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItems) {
        existingItems.quantity++;
        existingItems.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.itemsList.find((item) => item.id === id);
      
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});



export const cartActions = cartSlice.actions;

export default cartSlice;
