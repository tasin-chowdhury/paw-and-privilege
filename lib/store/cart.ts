import { create } from "zustand";

export interface CartItem {
  listingId: string;
  title: string;
  price: number;
  unit: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.listingId === item.listingId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.listingId === item.listingId ? { ...i, quantity: i.quantity + 1 } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true };
    }),
  removeItem: (listingId) =>
    set((state) => ({ items: state.items.filter((i) => i.listingId !== listingId) })),
  updateQuantity: (listingId, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.listingId === listingId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),
  clear: () => set({ items: [] }),
}));
