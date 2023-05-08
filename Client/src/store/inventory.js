import { create } from 'zustand';

const inventoryStore = create((set) => ({
    inventory: [],
    setInventory: (inventory) => set({ inventory }),
    removeItem: (id) => set((state) => ({ inventory: state.inventory.filter((item) => item._id !== id) })),
    editItem: (id, item) => set((state) => ({ inventory: state.inventory.map((i) => i._id === id ? item : i) })),
}));

export default inventoryStore;