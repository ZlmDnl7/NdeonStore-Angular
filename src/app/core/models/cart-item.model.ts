import { Product } from './product.model';

export interface CartItem {
  product: Product;
  cantidad: number;
}
