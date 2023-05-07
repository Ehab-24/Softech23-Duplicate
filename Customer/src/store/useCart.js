import {create} from "zustand"

const useCartStore = create((set, get)=>({
    cart: [],
    addToCart: (item) => {
        set(state => ({cart: [...state.cart, item]}));
    },
    removeFromCart: (item) => {
        const index = get().cart.findIndex(i => i._id === item._id);
        if (index !== -1) {
            const newCart = [...get().cart];
            newCart.splice(index, 1);
            set({ cart: newCart });
        }
    },    
    clearCart: () => {
        set({cart: []});
    },
    cartItems: () => {
        return get().cart.length;
    },
}))

export default useCartStore;