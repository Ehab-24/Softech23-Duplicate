import {create} from "zustand"

const useCartStore = create((set, get)=>({
    cart: [],
    addToCart: (item) => {
        set(state => ({cart: [...state.cart, item]}));
    },
    removeFromCart: (item) => {
        set(state => ({cart: state.cart.filter(i => i.id !== item.id)}));
    },
    clearCart: () => {
        set({cart: []});
    },
    cartItems: () => {
        return get().cart.length;
    },
}))

export default useCartStore;