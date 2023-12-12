import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface CartProduct {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  slug: string;
  size: string;
  finalPrice?: number | null;
  totalPrice?: number | null;
}

interface CartState {
  cartItems: CartProduct[];
  cartQuantity: number;
  cartTotalPrice: number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  decreaseQuantityInCart: (productId: string, size: string) => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cartItems: [],
        cartQuantity: 0,
        cartTotalPrice: 0,
        addToCart: (product) => {
          set((state) => {
            const updatedCart = [...state.cartItems];
            const existingProductIndex = updatedCart.findIndex(
              (item) =>
                item.productId === product.productId &&
                item.size === product.size
            );

            if (existingProductIndex !== -1) {
              // If the product with the same size already exists in the cart, update its quantity and final price
              if (
                product.quantity + updatedCart[existingProductIndex].quantity >
                product.stock
              ) {
                console.log("Not enough stock available");
                toast.error("Not enough stock available");
                return state; // Prevent further changes to the cart
              }

              updatedCart[existingProductIndex].quantity += product.quantity;
              if (product.finalPrice !== undefined) {
                updatedCart[existingProductIndex].finalPrice =
                  product.finalPrice;
              }
            } else {
              // Otherwise, add it as a new item
              if (product.quantity > product.stock) {
                console.log("Not enough stock available");
                toast.error("Not enough stock available");
                return state; // Prevent further changes to the cart
              }

              updatedCart.push(product);
            }

            // Declare newCartQuantity and newCartTotalPrice
            let newCartQuantity = 0;
            let newCartTotalPrice = 0;

            // Calculate the newCartQuantity and newCartTotalPrice
            updatedCart.forEach((item) => {
              if (item.quantity > item.stock) {
                console.log("Not enough stock available");
                toast.error("Not enough stock available");
                return state; // Prevent further changes to the cart
              }
              item.totalPrice = item.quantity * item.price;
              newCartQuantity += item.quantity;
              newCartTotalPrice += item.totalPrice;
            });

            if (newCartQuantity > 15) {
              console.log("Only 15 products can be added to cart");
              toast.error("Only 15 products can be added to cart");
              return state; // Prevent further changes to the cart
            }

            return {
              cartItems: updatedCart,
              cartQuantity: newCartQuantity,
              cartTotalPrice: newCartTotalPrice,
            };
          });
        },
        removeFromCart: (productId, size) => {
          set((state) => {
            const updatedCart = state.cartItems.filter(
              (item) => item.productId !== productId || item.size !== size
            );

            // Calculate the new cartQuantity and cartTotalPrice after removing items
            let newCartQuantity = 0;
            let newCartTotalPrice = 0;
            updatedCart.forEach((item) => {
              newCartQuantity += item.quantity;
              newCartTotalPrice += item.totalPrice || 0;
            });

            return {
              cartItems: updatedCart,
              cartQuantity: newCartQuantity,
              cartTotalPrice: newCartTotalPrice,
            };
          });
        },
        decreaseQuantityInCart: (productId, size) => {
          set((state) => {
            const updatedCart = [...state.cartItems];
            const existingProductIndex = updatedCart.findIndex(
              (item) => item.productId === productId && item.size === size
            );

            if (existingProductIndex !== -1) {
              // Decrease the quantity by 1, but ensure it doesn't go below 1
              updatedCart[existingProductIndex].quantity = Math.max(
                1,
                updatedCart[existingProductIndex].quantity - 1
              );

              // Recalculate total price and quantities
              let newCartQuantity = 0;
              let newCartTotalPrice = 0;
              updatedCart.forEach((item) => {
                item.totalPrice = item.quantity * item.price;
                newCartQuantity += item.quantity;
                newCartTotalPrice += item.totalPrice;
              });

              // Update the state with the modified cart
              return {
                cartItems: updatedCart,
                cartQuantity: newCartQuantity,
                cartTotalPrice: newCartTotalPrice,
              };
            }

            // If the product is not in the cart, return the current state
            return state;
          });
        },
        clearCart: () => {
          set({
            cartItems: [],
            cartQuantity: 0,
            cartTotalPrice: 0,
          });
        },
      }),
      {
        name: "cartStore",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    )
  )
);

export default useCartStore;
