import useStore from "@/store/store";
import useWishlistStore from "@/store/wishlist";

export function GetWishlist() {
  const wishlistItemss = useStore(
    useWishlistStore,
    (state) => state.wishlistItems
  );
  return wishlistItemss;
}
