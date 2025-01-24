import { Product } from "../Products/product.model";


export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  user: { id: number; name: string };
  cartItems: CartItem[];
  totalPrice: number;
}
