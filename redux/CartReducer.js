import { createSlice } from '@reduxjs/toolkit';


export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action?.payload?.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cart.push({ ...action?.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const removeitem = state.cart.filter(item => item?.id !== action?.payload?.id);
            state.cart = removeitem;
        },
        increaseItemQuantity: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action?.payload?.id);
            existingItem.quantity++;
        },
        decreaseItemQuantity: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action?.payload?.id);
            if (existingItem.quantity === 1) {
                existingItem.quantity = 0
                const removeitem = state.cart.filter(item => item?.id !== action?.payload?.id);
                state.cart = removeitem;
            } else {
                existingItem.quantity--;
            }
        },
        cleanCart: (state) => {
            state.cart = [];
        }
    }
})

export const { addToCart } = CartSlice.actions;

export default CartSlice.reducer